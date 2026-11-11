# MindShare

Plataforma para compartilhar ideias, conversar por meio de comentários e votar nas propostas da comunidade. O projeto conta com autenticação e gerenciamento de membros.

## Links

- **Aplicação:** [mindshare-sable.vercel.app](https://mindshare-sable.vercel.app)
- **Repositório:** [github.com/guedescss/mindshare](https://github.com/guedescss/mindshare)
- **Apresentação no LinkedIn:** [Ver apresentação](https://www.linkedin.com/feed/update/urn:li:activity:7526362306931466241/)

## Tecnologias

- **Frontend:** React, TypeScript, Vite, Tailwind CSS e Apollo Client
- **Backend:** Node.js, TypeScript, Express, Apollo Server, GraphQL e TypeGraphQL
- **Banco de dados:** PostgreSQL com Prisma ORM

## Funcionalidades

- Cadastro e autenticação de usuários
- Criação, edição e exclusão de ideias
- Comentários e votos em ideias
- Gerenciamento de membros e permissões

## Executar localmente

É necessário ter Node.js e PostgreSQL instalados.

### Backend

Configure as variáveis de ambiente em `backend/.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/mindshare"
JWT_SECRET="uma-chave-secreta"
```

Depois, instale as dependências e inicie o servidor:

```bash
cd backend
npm install
npm run dev
```

### Frontend

Configure `frontend/.env` com o endereço da API GraphQL:

```env
VITE_API_URL="http://localhost:4000/graphql"
```

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```
