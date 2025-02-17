const { Router } = require("express");
const router = Router();

// Impuestos controller
const impuestosController = require("../../controllers/gastosController/impuestosController");

router.get("/impuestos", impuestosController.getAll);

router.get("/impuestos/:id/detalles", impuestosController.getOneByPK);

router.get("/impuestos/crear", impuestosController.create);

module.exports = router;