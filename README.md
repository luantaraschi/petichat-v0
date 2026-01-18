# PetiChat 🐾⚖️

**Plataforma inteligente para criação de peças jurídicas com assistência de IA**

PetiChat é uma aplicação web moderna que auxilia advogados e profissionais jurídicos na criação, edição e validação de documentos legais utilizando inteligência artificial.

## ✨ Funcionalidades

- **📝 Gerador de Peças Jurídicas** - Wizard guiado para criação de documentos com 195+ modelos
- **🤖 Assistente de IA** - Reescrita, formalização e aprimoramento de textos jurídicos
- **📚 Biblioteca de Templates** - Categorias: Cível, Trabalhista, Previdenciário, Criminal e mais
- **✏️ Editor Inteligente** - Edição em tempo real com sugestões contextuais
- **📊 Dashboard** - Histórico e gestão de documentos criados
- **🔍 Validação** - Verificação de citações e coerência jurídica

## 🛠️ Tecnologias

- **Frontend**: Next.js 16, React 19, TypeScript
- **Estilização**: Tailwind CSS, Radix UI, shadcn/ui
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **IA**: OpenAI GPT / Google Gemini
- **Autenticação**: NextAuth.js

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Chave de API OpenAI ou Google AI

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/petichat-v0.git
cd petichat-v0

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Execute as migrações do banco
npx prisma migrate dev

# Popule o banco com templates
npx prisma db seed

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## ⚙️ Variáveis de Ambiente

```env
DATABASE_URL="postgresql://user:password@localhost:5432/petichat"
AUTH_SECRET="seu-secret-aqui"
OPENAI_API_KEY="sk-..."
GOOGLE_AI_API_KEY="..." # Opcional
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (app)/           # Rotas autenticadas
│   │   ├── dashboard/   # Dashboard principal
│   │   ├── editor/      # Editor de peças
│   │   ├── wizard/      # Assistente de criação
│   │   └── rewrite/     # Reescrita de textos
│   ├── (auth)/          # Páginas de autenticação
│   └── api/             # API Routes
├── components/          # Componentes React
├── lib/                 # Utilitários e configurações
└── data/               # Dados estáticos (templates)
```

## 📋 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Verifica código com ESLint |
| `npx prisma studio` | Interface visual do banco |
| `npx prisma db seed` | Popula templates no banco |

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ para a comunidade jurídica brasileira
