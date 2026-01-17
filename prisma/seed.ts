import "dotenv/config";
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter })

async function main() {
    const templates = [
        {
            category: "Administrativo",
            title: "Abertura de Processo Administrativo",
            description: "Requeira a instauração de procedimento para apurar condutas e aplicar medidas cabíveis com base nos fatos narrados.",
            tags: ["Popular"],
            isPopular: true,
        },
        {
            category: "Administrativo",
            title: "Pedido de Informações",
            description: "Solicite dados oficiais, resguardando o direito de acesso à informação e à transparência na gestão pública.",
            tags: [],
            isPopular: false,
        },
        {
            category: "Cível",
            title: "Ação de Indenização por Danos Morais",
            description: "Pleiteie reparação financeira por ofensas à honra, imagem ou dignidade, fundamentada no Código Civil.",
            tags: ["Popular", "Danos"],
            isPopular: true,
        },
        {
            category: "Cível",
            title: "Petição Inicial de Cobrança",
            description: "Busque o recebimento de dívidas vencidas e não pagas através da via judicial.",
            tags: [],
            isPopular: false,
        },
        {
            category: "Trabalhista",
            title: "Reclamação Trabalhista (Verbas Rescisórias)",
            description: "Pleiteie o pagamento de verbas não quitadas na rescisão do contrato de trabalho.",
            tags: ["Popular"],
            isPopular: true,
        },
        {
            category: "Consumidor",
            title: "Ação Declaratória de Inexistência de Débito",
            description: "Conteste cobranças indevidas e requeira a exclusão do nome dos órgãos de proteção ao crédito.",
            tags: ["Popular"],
            isPopular: true,
        },
        {
            category: "Família",
            title: "Ação de Alimentos",
            description: "Requeira a fixação de pensão alimentícia em favor de filhos menores ou cônjuge necessitado.",
            tags: [],
            isPopular: false,
        },
        {
            category: "Família",
            title: "Ação de Divórcio Consensual",
            description: "Formalize a dissolução do casamento de forma amigável, estabelecendo partilha e guarda.",
            tags: [],
            isPopular: false,
        },
        {
            category: "Criminal",
            title: "Pedido de Liberdade Provisória",
            description: "Requeira a liberdade do acusado mediante o cumprimento de medidas cautelares diversas da prisão.",
            tags: ["Urgente"],
            isPopular: false,
        },
        {
            category: "Previdenciário",
            title: "Concessão de Auxílio-Doença",
            description: "Pleiteie o benefício por incapacidade temporária para o trabalho junto ao INSS.",
            tags: [],
            isPopular: false,
        }
    ]

    console.log('Start seeding ...')

    // Upsert instead of create to avoid duplicates on re-seed
    for (const t of templates) {
        // We'll search by title for simplicity in this mock
        const existing = await prisma.template.findFirst({ where: { title: t.title } })
        if (!existing) {
            const template = await prisma.template.create({
                data: t,
            })
            console.log(`Created template with id: ${template.id}`)
        } else {
            console.log(`Template ${t.title} already exists.`)
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
