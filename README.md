# Painel de Pedidos — WebSocket

Aplicação web de painel de pedidos em tempo real usando WebSocket.

## Como executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor
```bash
npm start
```

### 3. Abrir no navegador

| Tela | URL |
|------|-----|
| Painel | http://localhost:3000/ |

> **Dica:** Abra as duas URLs em abas separadas para ver o WebSocket em ação.

## Estrutura do projeto

```
painel-pedidos/
├── server.js              ← Servidor Node.js + Express + WebSocket
├── package.json
├── README.md
└── public/
    ├── index.html         ← Painel de pedidos (tempo real)
    └── novo-pedido.html   ← Tela do cliente para fazer pedido
```

## Tecnologias

- **Backend:** Node.js, Express, ws (WebSocket)
- **Frontend:** HTML, CSS, JavaScript puro
- **Dados:** armazenados em memória (variável `pedidos[]`)

## Funcionalidades

- Pedidos aparecem instantaneamente no painel ao serem enviados
- Múltiplos clientes podem fazer pedidos simultâneos
- Status do pedido pode ser alterado: Pendente → Em Preparo → Pronto
- Contadores atualizados em tempo real
- Reconexão automática se a conexão cair
- Indicador visual de status de conexão (WebSocket)
