var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM academia WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT idacademia, nome, CEP, bairro FROM academia`;

  return database.executar(instrucaoSql);
}

function buscarPorCep(CEP) {
  var instrucaoSql = `SELECT * FROM academia WHERE CEP = '${CEP}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, CEP) {
  var instrucaoSql = `INSERT INTO academia (nome, CEP) VALUES ('${nome}', '${CEP}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCep, buscarPorId, cadastrar, listar };
