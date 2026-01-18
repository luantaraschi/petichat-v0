import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

// List pieces for the current user
export async function GET(req: NextRequest) {
    try {
        // Get current user session
        const session = await auth();

        // For demo purposes, if no session, show all pieces
        const userId = session?.user?.id;

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Build where clause
        const where: Record<string, unknown> = {};

        // Only filter by user if we have a userId
        if (userId) {
            where.userId = userId;
        }

        if (status && status !== 'all') {
            where.status = status;
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Get pieces with template info
        const [pieces, total] = await Promise.all([
            prisma.piece.findMany({
                where,
                include: {
                    template: { select: { title: true, category: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma.piece.count({ where }),
        ]);

        return Response.json({
            pieces,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("List pieces error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

// Create a new piece
export async function POST(req: NextRequest) {
    console.log('[API /pieces] POST request received');

    try {
        const session = await auth();
        console.log('[API /pieces] Session:', JSON.stringify(session, null, 2));

        // For demo purposes, use a default userId if not authenticated
        // If no session, try to find an existing user or create a demo user
        let userId = session?.user?.id;
        console.log('[API /pieces] Initial userId from session:', userId);

        // Always look for a real user in the database since auth may return mock IDs
        if (userId) {
            console.log('[API /pieces] Checking if userId exists in database...');
            const existingUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                console.log('[API /pieces] User ID from session not found in database, will fallback');
                userId = undefined;
            } else {
                console.log('[API /pieces] Found user in database:', existingUser.id);
            }
        }

        if (!userId) {
            console.log('[API /pieces] No valid userId, looking for any existing user...');
            // Try to find any user
            const anyUser = await prisma.user.findFirst();

            if (anyUser) {
                userId = anyUser.id;
                console.log('[API /pieces] Using existing user:', userId);
            } else {
                console.log('[API /pieces] No users found, creating demo user...');
                const newUser = await prisma.user.create({
                    data: {
                        name: "Demo User",
                        email: "demo@example.com",
                    }
                });
                userId = newUser.id;
                console.log('[API /pieces] Created demo user:', userId);
            }
        }

        const { templateId, title, contentJson, inputsJson, thesesJson, jurisJson } = await req.json();
        console.log('[API /pieces] Request data - templateId:', templateId, 'title:', title);

        if (!templateId) {
            console.error('[API /pieces] Missing templateId');
            return new Response(JSON.stringify({ error: 'templateId is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Handle numeric template IDs from mock data - map to real database template
        let realTemplateId = templateId;

        // If templateId is a numeric string, find the template by mock ID mapping
        if (/^\d+$/.test(templateId)) {
            console.log('[API /pieces] Numeric templateId detected, mapping to database template...');
            // Import mock templates to get title mapping
            const { templates: mockTemplates } = await import('@/data/templates');
            const mockTemplate = mockTemplates.find(t => t.id === templateId);

            if (!mockTemplate) {
                console.error('[API /pieces] Mock template not found:', templateId);
                return new Response(JSON.stringify({ error: 'Template not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            console.log('[API /pieces] Mock template found:', mockTemplate.title);

            // Find the real template in database by title
            const dbTemplate = await prisma.template.findFirst({
                where: { title: mockTemplate.title },
            });

            if (!dbTemplate) {
                console.error('[API /pieces] Database template not found for:', mockTemplate.title);
                return new Response(JSON.stringify({ error: `Template "${mockTemplate.title}" not found in database. Run prisma db seed to populate templates.` }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            realTemplateId = dbTemplate.id;
            console.log('[API /pieces] Mapped to database template:', realTemplateId);
        }

        // Create the piece with the real template ID
        console.log('[API /pieces] Creating piece in database...');
        const piece = await prisma.piece.create({
            data: {
                userId,
                templateId: realTemplateId,
                title: title || null,
                contentJson: contentJson || null,
                inputsJson: inputsJson || null,
                thesesJson: thesesJson || null,
                jurisJson: jurisJson || null,
                status: 'draft',
            },
            include: {
                template: { select: { title: true, category: true } },
            },
        });

        console.log('[API /pieces] Piece created successfully:', piece.id);
        return Response.json(piece);
    } catch (error) {
        console.error("[API /pieces] Create piece error:", error);
        console.error("[API /pieces] Error details:", {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            name: error instanceof Error ? error.name : undefined,
        });

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            details: errorMessage
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
