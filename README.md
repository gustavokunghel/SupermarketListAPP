# 🛒 SupermarketList

Aplicativo mobile de lista de compras de supermercado com gerenciamento de produtos e
quantidades.

<p align="center">
  <img src="./screenshots/EmptyHome.png" alt="Tela Inicial" width="200"/>
  <img src="./screenshots/FullHome.png" alt="Lista Preenchida" width="200"/>
  <img src="./screenshots/EmptyAdd.png" alt="Adicionar Produtos" width="200"/>
  <img src="./screenshots/FullAdd.png" alt="Produtos Selecionados" width="200"/>
</p>

## 📱 Sobre o Projeto

SupermarketList é uma aplicação completa (frontend + backend) para gerenciamento de listas
de compras. O usuário pode navegar por centenas de produtos, adicionar itens à lista e
ajustar as quantidades conforme necessário.

## 🏗️ Arquitetura

O projeto é dividido em duas partes principais:

- **Frontend**: App mobile React Native + Expo
- **Backend**: API REST Node.js + Express + Supabase

## 🚀 Tecnologias

### Frontend

- React Native
- Expo Router (navegação)
- TypeScript
- Zustand (estado global)
- TanStack Query (cache e dados)
- FlashList (listas performáticas)
- Phosphor Icons

### Backend

- Node.js
- Express
- TypeScript
- Supabase (PostgreSQL)
- CORS

## 📂 Estrutura do Projeto

```
SupermarketList/
├── Frontend/              # App mobile React Native
│   ├── app/              # Rotas (file-based routing)
│   ├── components/       # Componentes reutilizáveis
│   ├── hooks/            # Custom hooks
│   ├── store/            # Gerenciamento de estado
│   ├── styles/           # Design tokens
│   └── README.md
├── Backend/              # API REST
│   ├── src/
│   │   ├── config/      # Configurações
│   │   ├── routes/      # Endpoints da API
│   │   ├── types/       # Tipos TypeScript
│   │   └── server.ts    # Servidor principal
│   └── README.md
└── screenshots/          # Prints do aplicativo
    └── README.md
```

## 🎯 Funcionalidades

- ✅ Listagem de produtos com paginação infinita
- ✅ Adicionar/remover produtos da lista de compras
- ✅ Ajustar quantidade de cada item
- ✅ Contador total de itens na lista
- ✅ Persistência local da lista (AsyncStorage)
- ✅ Interface intuitiva e responsiva
- ✅ Estados de loading e erro tratados
- ✅ Performance otimizada

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- Node.js v16 ou superior
- npm ou yarn
- Conta no Supabase
- App Expo Go (para testar no celular)

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd SupermarketList
```

### 2. Configure o Backend

```bash
cd Backend
npm install

# Criar arquivo .env com suas credenciais do Supabase
echo "SUPABASE_URL=sua_url_aqui" > .env
echo "SUPABASE_ANON_KEY=sua_chave_aqui" >> .env
echo "PORT=3000" >> .env

# Criar tabela products no Supabase (via SQL Editor):
# CREATE TABLE products (
#   id SERIAL PRIMARY KEY,
#   name TEXT NOT NULL,
#   image TEXT
# );

# Iniciar servidor
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 3. Configure o Frontend

```bash
cd Frontend
npm install

# Iniciar app
npm start
```

Use o app Expo Go para escanear o QR code e testar no celular.

## 📡 API Endpoints

### GET /api/products

Retorna lista paginada de produtos.

**Query Params:**

- `page`: número da página (padrão: 1)
- `limit`: itens por página (padrão: 20, máx: 100)

**Exemplo:**

```
GET http://localhost:3000/api/products?page=1&limit=20
```

## 🎨 Design

O app segue um design system consistente com:

- Paleta de cores personalizável
- Tipografia Inter (Google Fonts)
- Tokens de espaçamento, border radius e font sizes
- Componentes reutilizáveis

## 📸 Screenshots

<table>
  <tr>
    <td align="center">
      <img src="./screenshots/EmptyHome.png" width="200"/><br />
      <b>Lista Vazia</b>
    </td>
    <td align="center">
      <img src="./screenshots/FullHome.png" width="200"/><br />
      <b>Lista Preenchida</b>
    </td>
    <td align="center">
      <img src="./screenshots/EmptyAdd.png" width="200"/><br />
      <b>Selecionar Produtos</b>
    </td>
    <td align="center">
      <img src="./screenshots/FullAdd.png" width="200"/><br />
      <b>Produtos Adicionados</b>
    </td>
  </tr>
</table>

Veja mais detalhes na pasta [screenshots](./screenshots/README.md).

## 📚 Documentação Adicional

- [Frontend README](./Frontend/README.md) - Detalhes do app mobile
- [Backend README](./Backend/README.md) - Detalhes da API
- [Screenshots README](./screenshots/README.md) - Guia para adicionar prints

## 📄 Licença

Projeto pessoal educacional.
