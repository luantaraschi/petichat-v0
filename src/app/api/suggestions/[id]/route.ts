import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// Update suggestion status (accept/reject)
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status, suggestedText } = await req.json();

        if (!['accepted', 'rejected', 'pending'].includes(status)) {
            return new Response('Invalid status', { status: 400 });
        }

        const suggestion = await prisma.aiSuggestion.findUnique({
            where: { id },
            include: { piece: true },
        });

        if (!suggestion) {
            return new Response('Suggestion not found', { status: 404 });
        }

        // If accepting, create a new PieceVersion and update the piece
        if (status === 'accepted') {
            // Get the current piece content
            const piece = suggestion.piece;
            const currentContent = piece.contentJson;

            // Create a new version before updating
            const pieceVersion = await prisma.pieceVersion.create({
                data: {
                    pieceId: piece.id,
                    contentJson: currentContent ?? {},
                    changeReason: 'ai_suggestion',
                },
            });

            // Update the suggestion with the version reference and final suggested text
            await prisma.aiSuggestion.update({
                where: { id },
                data: {
                    status,
                    suggestedText: suggestedText || suggestion.suggestedText,
                    pieceVersionId: pieceVersion.id,
                },
            });

            return Response.json({
                success: true,
                pieceVersionId: pieceVersion.id,
                message: 'Suggestion accepted and version created',
            });
        }

        // For rejection, just update the status
        await prisma.aiSuggestion.update({
            where: { id },
            data: {
                status,
                suggestedText: suggestedText || suggestion.suggestedText,
            },
        });

        return Response.json({
            success: true,
            message: status === 'rejected' ? 'Suggestion rejected' : 'Suggestion updated',
        });
    } catch (error) {
        console.error("Update suggestion error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

// Get suggestion details
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const suggestion = await prisma.aiSuggestion.findUnique({
            where: { id },
            include: {
                piece: { select: { id: true, title: true } },
                pieceVersion: { select: { id: true, createdAt: true } },
            },
        });

        if (!suggestion) {
            return new Response('Suggestion not found', { status: 404 });
        }

        return Response.json(suggestion);
    } catch (error) {
        console.error("Get suggestion error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
