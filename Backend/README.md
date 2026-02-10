# Backend - SupermarketList API

API REST para fornecer lista de produtos de supermercado com paginação.

## 🚀 Tecnologias

- **Node.js**: Runtime JavaScript
- **Express**: Framework web minimalista
- **TypeScript**: Linguagem tipada
- **Supabase**: Banco de dados PostgreSQL como serviço
- **CORS**: Habilitado para requisições cross-origin
- **dotenv**: Gerenciamento de variáveis de ambiente

## 📂 Estrutura do Projeto

```
Backend/
├── src/
│   ├── config/
│   │   └── supabase.ts      # Configuração do cliente Supabase
│   ├── routes/
│   │   ├── items.ts         # Rotas antigas (legado)
│   │   └── products.ts      # Rotas de produtos
│   ├── types/
│   │   └── database.ts      # Tipos do banco de dados
│   └── server.ts            # Servidor principal
├── .env                     # Variáveis de ambiente
├── package.json
└── tsconfig.json
```

## 🎯 Endpoints

### GET /api/products

Retorna lista paginada de produtos.

**Query Parameters:**

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 20, máx: 100)

**Resposta:**

```json
{
  "products": [
    {
      "id": 1,
      "name": "Maçã",
      "image": "https://example.com/maca.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 300,
    "totalPages": 15,
    "hasNextPage": true
  }
}
```

## 🛠️ Como Rodar

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Conta no Supabase

### Configurar Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Execute o SQL abaixo no SQL Editor:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT
);
```

4. (Opcional) Importe os dados do arquivo `seed_products_300_supabase.csv`

### Instalação

```bash
# Instalar dependências
npm install

# Copiar o arquivo de exemplo e configurar suas credenciais
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Supabase

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento com hot reload
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor em produção (após build)

## 📊 Banco de Dados

### Tabela: products

| Coluna | Tipo   | Descrição                |
| ------ | ------ | ------------------------ |
| id     | SERIAL | ID único do produto      |
| name   | TEXT   | Nome do produto          |
| image  | TEXT   | URL da imagem do produto |

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua.chave.anon.key
PORT=3000
```

## 📦 Dependências Principais

- **express**: Framework web
- **@supabase/supabase-js**: Cliente oficial do Supabase
- **cors**: Middleware para CORS
- **dotenv**: Carregador de variáveis de ambiente
- **ts-node-dev**: Executor TypeScript com hot reload (dev)
