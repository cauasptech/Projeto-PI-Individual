var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

    // JOIN com academia para retornar o nome da academia
    var instrucaoSql = `
        SELECT u.idusuario id, u.nome, u.email, u.genero, a.nome AS nome_academia FROM usuario u LEFT JOIN academia a ON u.fkAcademia = a.idacademia WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, genero, nomeAcademia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, genero, nomeAcademia);

    // subquery para buscar o id da academia pelo nome
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, genero, fkAcademia) VALUES ('${nome}', '${email}', '${senha}', '${genero}', (SELECT idacademia FROM academia WHERE nome = '${nomeAcademia}' LIMIT 1));
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// contar usuários por gênero
function contarPorGenero() {
    var instrucaoSql = `
        SELECT genero, COUNT(*) AS total FROM usuario GROUP BY genero;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    contarPorGenero
};