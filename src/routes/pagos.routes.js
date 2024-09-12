const { Router } = require("express");
const router = Router();

const controller = require("../controllers/pagosController/chequesController");

router.get("/cheques/registro", controller.registroCheques);

module.exports = router;
