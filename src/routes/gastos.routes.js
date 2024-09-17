const { Router } = require("express");
const router = Router();

const controller = require("../controllers/gastosController");

// ../controllers/gastosController de gastos
router.get("/", controller.mostrarGastos);

router.get("/servicios", controller.registroServicios);

module.exports = router;
