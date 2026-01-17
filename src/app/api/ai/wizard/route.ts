
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, generateText } from 'ai';

// export const runtime = 'edge'; // Use default nodejs runtime for better stability/logs

export async function POST(req: Request) {
    try {
        const { text, action, customPrompt } = await req.json();

        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            console.error("GOOGLE_API_KEY is missing");
            return new Response('API Key missing', { status: 500 });
        }

        const google = createGoogleGenerativeAI({
            apiKey: apiKey,
        });

        if (!text) {
            return new Response('Text is required', { status: 400 });
        }

        let prompt = '';
        switch (action) {
            case 'improve':
                prompt = `Melhore o texto a seguir para usar vocabulário jurídico mais adequado e tom profissional, mantendo o significado original. Não inclua observações introdutórias ou conclusivas, apenas o texto melhorado. Responda em português brasileiro:\n\n"${text}"`;
                break;
            case 'fix':
                prompt = `Corrija quaisquer erros de gramática, ortografia e pontuação no texto a seguir. Mantenha o tom original. Não inclua aspas ou explicações. Responda em português brasileiro:\n\n"${text}"`;
                break;
            case 'summarize':
                prompt = `Forneça um resumo conciso do texto a seguir, focando nos fatos jurídicos principais. Não inclua cabeçalho "Resumo:". Responda em português brasileiro:\n\n"${text}"`;
                break;
            case 'expand':
                prompt = `Reescreva o texto a seguir de forma expandida, adicionando mais detalhes descritivos e vocabulário jurídico formal. NÃO forneça opções ou alternativas. Apenas reescreva o texto original UMA ÚNICA VEZ de forma mais completa e detalhada. NÃO invente fatos novos, apenas enriqueça a descrição dos fatos existentes. Responda em português brasileiro:\n\n"${text}"`;
                break;
            case 'custom':
                prompt = `Aplique a seguinte instrução ao texto: "${customPrompt}"\n\nTexto original:\n"${text}"\n\nResponda em português brasileiro, retornando apenas o texto modificado, sem explicações.`;
                break;
            default:
                return new Response('Invalid action', { status: 400 });
        }

        console.log("Starting generation with model: gemini-3-flash-preview");

        // Use streaming for real-time text display
        const result = streamText({
            model: google('gemini-3-flash-preview'),
            prompt,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("API Error Detailed:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error }), { status: 500 });
    }
}
