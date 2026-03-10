const STATUS = ["Recebido", "Em preparo", "Pronto", "Entregue"];

let pedidos = [];
let proximoId = 1;

function criar({ cliente, itens }) {
  const pedido = {
    id: proximoId++,
    cliente,
    itens,
    status: STATUS[0],
    hora: new Date().toLocaleTimeString("pt-BR"),
  };
  pedidos.push(pedido);
  return pedido;
}

function avancarStatus(id) {
  const pedido = pedidos.find((p) => p.id === id);
  if (!pedido) return null;

  const idxAtual = STATUS.indexOf(pedido.status);
  if (idxAtual === STATUS.length - 1) return null; 

  pedido.status = STATUS[idxAtual + 1];
  return pedido;
}

function listar() {
  return pedidos;
}

module.exports = { criar, avancarStatus, listar };
