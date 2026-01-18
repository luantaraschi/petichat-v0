import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// List all templates
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        const where = category && category !== 'Todos'
            ? { category }
            : {};

        const templates = await prisma.template.findMany({
            where,
            orderBy: { title: 'asc' },
            select: {
                id: true,
                title: true,
                category: true,
                description: true,
            },
        });

        return Response.json(templates);
    } catch (error) {
        console.error("List templates error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
