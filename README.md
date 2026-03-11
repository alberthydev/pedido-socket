# Painel de Pedidos - WebSocket

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

> **Dica:** Abra duas URLs em abas separadas para ver o como o WebSocket trabalha com diversos clientes.

## Estrutura do projeto

```
painel-pedidos/
├── server.js
├── package.json
├── README.md
├── controllers/
    └── pedidoController.js
├── models/
    └── pedidoModel.js
├── routes/
    └── pedidoRoutes.js
└── public/
    └── index.html
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
