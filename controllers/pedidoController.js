const pedidoModel = require("../models/pedidoModel");

function handleMensagem(ws, wss, mensagem, logConexao) {
  let payload;

  try {
    payload = JSON.parse(mensagem);
  } catch {
    console.error("Mensagem inválida recebida");
    return;
  }

  const { tipo, dados } = payload;

  if (tipo === "NOVO_PEDIDO") {
    const pedido = pedidoModel.criar(dados);
    logConexao(`Pedido #${pedido.id} criado — ${pedido.cliente}`);
    broadcast(wss, "PEDIDO_CRIADO", pedido);
    return;
  }

  if (tipo === "ATUALIZAR_STATUS") {
    const pedido = pedidoModel.avancarStatus(dados.id);
    if (!pedido) return;
    logConexao(`Pedido #${pedido.id} → ${pedido.status}`);
    broadcast(wss, "STATUS_ATUALIZADO", { id: pedido.id, status: pedido.status });
    return;
  }
}

function handleConexao(ws, wss, logs, logConexao) {
  logConexao(`Novo cliente conectado | Total: ${wss.clients.size}`);

  ws.send(JSON.stringify({
    tipo: "ESTADO_INICIAL",
    dados: { pedidos: pedidoModel.listar(), logs },
  }));

  broadcast(wss, "CLIENTES", { total: wss.clients.size });
}

function handleDesconexao(wss, logConexao) {
  logConexao(`Cliente desconectado | Total: ${wss.clients.size}`);
  broadcast(wss, "CLIENTES", { total: wss.clients.size });
}

function broadcast(wss, tipo, dados) {
  const mensagem = JSON.stringify({ tipo, dados });
  wss.clients.forEach((cliente) => {
    if (cliente.readyState === 1) { // 1 = OPEN
      cliente.send(mensagem);
    }
  });
}

module.exports = { handleMensagem, handleConexao, handleDesconexao };
