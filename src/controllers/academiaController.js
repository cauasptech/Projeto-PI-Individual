var empresaModel = require("../models/academiaModel");

function buscarPorCep(req, res) {
  var CEP = req.query.CEP;

  empresaModel.buscarPorCep(CEP).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var CEP = req.body.CEP;
  var nome = req.body.nome;

  empresaModel.buscarPorCep(CEP).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a academia com o CEP ${CEP} já existe` });
    } else {
      empresaModel.cadastrar(nome, CEP).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  buscarPorCep,
  buscarPorId,
  cadastrar,
  listar,
};
