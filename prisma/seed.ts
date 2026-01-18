import "dotenv/config";
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { templates as mockTemplates } from '../src/data/templates';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Start seeding templates...')
    console.log(`Found ${mockTemplates.length} templates to seed`)

    let created = 0;
    let existing = 0;

    // Import all templates from templates.ts
    for (const mockTemplate of mockTemplates) {
        // Check if template already exists by title
        const existingTemplate = await prisma.template.findFirst({
            where: { title: mockTemplate.title }
        })

        if (!existingTemplate) {
            const template = await prisma.template.create({
                data: {
                    category: mockTemplate.category,
                    title: mockTemplate.title,
                    description: mockTemplate.description,
                    tags: mockTemplate.isPopular ? ["Popular"] : [],
                    isPopular: mockTemplate.isPopular || false,
                },
            })
            created++;
            if (created <= 10 || created % 20 === 0) {
                console.log(`✓ Created template: ${template.title}`)
            }
        } else {
            existing++;
        }
    }

    console.log('\n✅ Seeding finished!')
    console.log(`   Created: ${created} templates`)
    console.log(`   Already existed: ${existing} templates`)
    console.log(`   Total in database: ${created + existing} templates`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('❌ Seeding error:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
