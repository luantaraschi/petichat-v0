import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { pieceId, actionType, selectionFrom, selectionTo, originalText } = await req.json();

        if (!pieceId || !actionType || !originalText) {
            return new Response('Missing required fields', { status: 400 });
        }

        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            console.error("GOOGLE_API_KEY is missing");
            return new Response('API Key missing', { status: 500 });
        }

        const google = createGoogleGenerativeAI({ apiKey });

        // Build prompt based on action type
        let prompt = '';
        switch (actionType) {
            case 'rewrite':
                prompt = `Reescreva o texto a seguir mantendo o significado original mas com uma redação diferente, mais clara e profissional. Retorne APENAS o texto reescrito, sem explicações ou observações. Responda em português brasileiro:\n\n"${originalText}"`;
                break;
            case 'formalize':
                prompt = `Formalize o texto a seguir, tornando-o mais adequado para um documento jurídico formal. Use vocabulário técnico-jurídico quando apropriado. Retorne APENAS o texto formalizado, sem explicações. Responda em português brasileiro:\n\n"${originalText}"`;
                break;
            case 'reduce':
                prompt = `Reduza o texto a seguir, mantendo as informações essenciais mas em uma redação mais concisa e objetiva. Retorne APENAS o texto reduzido, sem explicações. Responda em português brasileiro:\n\n"${originalText}"`;
                break;
            case 'cohesion':
                prompt = `Melhore a coesão e fluidez do texto a seguir, ajustando conectivos e transições entre ideias para melhorar a leitura. Retorne APENAS o texto melhorado, sem explicações. Responda em português brasileiro:\n\n"${originalText}"`;
                break;
            case 'fundamentation':
                prompt = `Com base no texto a seguir, crie um tópico de fundamentação jurídica bem estruturado. Inclua referências a princípios gerais do direito quando aplicável. NÃO invente leis ou artigos específicos. Retorne APENAS o texto de fundamentação, sem explicações. Responda em português brasileiro:\n\n"${originalText}"`;
                break;
            default:
                return new Response('Invalid action type', { status: 400 });
        }

        // Create AiSuggestion record with pending status
        const suggestion = await prisma.aiSuggestion.create({
            data: {
                pieceId,
                actionType,
                selectionFrom: selectionFrom ?? 0,
                selectionTo: selectionTo ?? 0,
                originalText,
                suggestedText: '', // Will be updated after streaming
                status: 'pending',
            },
        });

        // Stream the response
        const result = streamText({
            model: google('gemini-2.0-flash'),
            prompt,
        });

        // Return streaming response with suggestion ID in header
        const response = result.toTextStreamResponse();

        // Create a new response with suggestion ID header
        const headers = new Headers(response.headers);
        headers.set('X-Suggestion-Id', suggestion.id);

        return new Response(response.body, {
            status: response.status,
            headers,
        });
    } catch (error) {
        console.error("AI Suggestion Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: String(error) }), { status: 500 });
    }
}
