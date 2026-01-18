import { prisma } from './prisma';

export type ChangeReason = 'ai_suggestion' | 'validation' | 'export' | 'manual';

/**
 * Creates a new PieceVersion with the current piece content
 */
export async function createPieceVersion(
    pieceId: string,
    contentJson: unknown,
    changeReason: ChangeReason
) {
    return prisma.pieceVersion.create({
        data: {
            pieceId,
            contentJson: contentJson ?? {},
            changeReason,
        },
    });
}

/**
 * Gets the latest version of a piece
 */
export async function getLatestPieceVersion(pieceId: string) {
    return prisma.pieceVersion.findFirst({
        where: { pieceId },
        orderBy: { createdAt: 'desc' },
    });
}

/**
 * Gets all versions of a piece
 */
export async function getPieceVersions(pieceId: string, limit = 10) {
    return prisma.pieceVersion.findMany({
        where: { pieceId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
            id: true,
            createdAt: true,
            changeReason: true,
        },
    });
}
