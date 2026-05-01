var express = require("express");
var router = express.Router();

var academiaController = require("../controllers/academiaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    academiaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    academiaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  academiaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  academiaController.listar(req, res);
});

module.exports = router;