import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// Get piece by ID
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const piece = await prisma.piece.findUnique({
            where: { id },
            include: {
                template: { select: { id: true, title: true, category: true } },
                versions: {
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                    select: { id: true, createdAt: true, changeReason: true },
                },
            },
        });

        if (!piece) {
            return new Response('Piece not found', { status: 404 });
        }

        return Response.json(piece);
    } catch (error) {
        console.error("Get piece error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

// Update piece content
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { contentJson, title, createVersion } = await req.json();

        const piece = await prisma.piece.findUnique({
            where: { id },
        });

        if (!piece) {
            return new Response('Piece not found', { status: 404 });
        }

        // If createVersion is requested, save current state as version first
        let pieceVersionId: string | undefined;
        if (createVersion && piece.contentJson) {
            const version = await prisma.pieceVersion.create({
                data: {
                    pieceId: id,
                    contentJson: piece.contentJson,
                    changeReason: 'manual',
                },
            });
            pieceVersionId = version.id;
        }

        // Update the piece
        const updatedPiece = await prisma.piece.update({
            where: { id },
            data: {
                ...(contentJson !== undefined && { contentJson }),
                ...(title !== undefined && { title }),
            },
        });

        return Response.json({
            success: true,
            piece: updatedPiece,
            pieceVersionId,
        });
    } catch (error) {
        console.error("Update piece error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
