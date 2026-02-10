# Frontend - SupermarketList

Aplicativo mobile de lista de compras desenvolvido com React Native e Expo.

## 📱 Sobre o Projeto

App para gerenciar listas de compras de supermercado. Permite adicionar produtos, ajustar
quantidades e visualizar o total de itens na lista.

## 🚀 Tecnologias

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma de desenvolvimento e build
- **TypeScript**: Linguagem tipada
- **Expo Router**: Navegação baseada em arquivos
- **Zustand**: Gerenciamento de estado global
- **TanStack Query (React Query)**: Gerenciamento de dados assíncronos e cache
- **FlashList**: Lista otimizada para performance
- **Phosphor React Native**: Ícones
- **Inter Font** (Google Fonts): Tipografia

## 📂 Estrutura do Projeto

```
Frontend/
├── app/                      # Rotas do app (file-based routing)
│   ├── _layout.tsx          # Layout raiz com providers
│   ├── index.tsx            # Tela principal (lista de compras)
│   └── list.tsx             # Tela de adicionar produtos
├── components/              # Componentes reutilizáveis
│   ├── AddButton.tsx        # Botão de adicionar itens
│   └── ItemRowCard.tsx      # Card de item da lista
├── hooks/                   # Custom hooks
│   ├── useProducts.ts       # Hook para buscar produtos da API
│   └── useTheme.ts          # Hook para tema/cores
├── store/                   # Gerenciamento de estado
│   └── useProductStore.ts   # Store Zustand para carrinho
├── styles/                  # Tokens de design
│   ├── borderRadius.ts      # Constantes de border radius
│   ├── colors.ts            # Paleta de cores
│   ├── fontSizes.ts         # Tamanhos de fonte
│   └── index.ts             # Export barrel
└── assets/                  # Imagens e recursos estáticos
```

## 🎨 Funcionalidades

- ✅ Listagem de produtos disponíveis
- ✅ Adicionar/remover produtos da lista
- ✅ Ajustar quantidade de cada item
- ✅ Contador total de itens
- ✅ Persistência local com AsyncStorage
- ✅ Design system consistente
- ✅ Paginação infinita de produtos
- ✅ Estado vazio com feedback visual
- ✅ Performance otimizada com FlashList

## 🛠️ Como Rodar

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI
- App Expo Go no celular (ou emulador Android/iOS)

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

### Executar no Dispositivo

Após iniciar o servidor, você verá um QR code no terminal. Use o app Expo Go para escanear
e testar.

Ou use as teclas de atalho:

- `a` - Abrir no Android
- `i` - Abrir no iOS
- `w` - Abrir no navegador

## 🔌 Configuração da API

O app se conecta ao backend através da URL configurada em
[hooks/useProducts.ts](hooks/useProducts.ts).

Certifique-se de que o backend está rodando em `http://localhost:3000` antes de iniciar o
app.

## 📦 Build para Produção

```bash
# Build para Android
npm run android

# Build para iOS
npm run ios
```

## 🎯 Decisões Técnicas

- **Zustand**: Escolhido por ser simples, performático e sem boilerplate
- **TanStack Query**: Gerencia cache e estados de loading/error automaticamente
- **FlashList**: Substitui FlatList para melhor performance em listas grandes
- **Expo Router**: Navegação moderna e intuitiva baseada em sistema de arquivos
- **TypeScript**: Segurança de tipos e melhor DX

## 📸 Screenshots

Veja os prints do app na pasta [screenshots](../screenshots/README.md)
