# Backend - Supermarket List API

API para listar alimentos disponíveis usando Supabase.

## Estrutura

```
Backend/
├── src/
│   ├── config/
│   │   └── supabase.ts
│   ├── routes/
│   │   └── items.ts
│   └── server.ts
├── .env
└── package.json
```

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## Configurar Supabase

Crie um arquivo `.env` com:

```
SUPABASE_URL=sua_url_aqui
SUPABASE_ANON_KEY=sua_chave_aqui
```

Execute no Supabase SQL Editor:

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT
);
```
