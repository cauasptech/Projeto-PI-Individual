var database = require("../database/config");

function listar() {
  var instrucaoSql = `
        SELECT p.idpost, p.esporte, p.dtTreino, p.descricao, u.nome
        FROM post p
        JOIN usuario u ON p.fkUsuario = u.idusuario
        ORDER BY p.dtTreino DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function publicar(esporte, descricao, fkUsuario) {
  var instrucaoSql = `
        INSERT INTO post (esporte, dtTreino, descricao, fkUsuario) VALUES ('${esporte}', NOW(), '${descricao}', '${fkUsuario}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function contarPorEsporte() {
  var instrucaoSql = `
        SELECT esporte, COUNT(*) AS total FROM post GROUP BY esporte;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  publicar,
  contarPorEsporte,
};
