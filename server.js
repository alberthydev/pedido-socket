const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const pedidoRoutes = require("./routes/pedidoRoutes");
const pedidoController = require("./controllers/pedidoController");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const logs = [];

function logConexao(msg) {
  const entry = { hora: new Date().toLocaleTimeString("pt-BR"), msg };
  logs.push(entry);
  if (logs.length > 50) logs.shift();
  console.log(`[${entry.hora}] ${msg}`);
}

// View
app.use(express.static("public"));
app.use("/", pedidoRoutes);

// Controller
wss.on("connection", (ws) => {
  pedidoController.handleConexao(ws, wss, logs, logConexao);

  ws.on("message", (mensagem) => {
    pedidoController.handleMensagem(ws, wss, mensagem, logConexao);
  });

  ws.on("close", () => {
    pedidoController.handleDesconexao(wss, logConexao);
  });
});

const PORTA = 3000;
server.listen(PORTA, () => {
  console.log(`\nServidor rodando em http://localhost:${PORTA}\n`);
});
