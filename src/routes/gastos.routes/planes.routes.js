const { Router } = require("express");
const router = Router();

const planesController = require("../../controllers/gastosController/planesController.js");

// Planes de Pago & Moratorias
router.get("/planes", planesController.getAll);

router.get("/planes/:id/detalles", planesController.getOneByPK);

router.get("/planes/crear", planesController.create);

router.post("/planes/crear", planesController.store);

// Planes de Pago & Moratorias > Cuotas


// Planes de Pago & Moratorias > Vencimientos
router.get("/planes/vencimientos/:id/detalles", planesController.getVencimientoByPK);

module.exports = router;