const { Router } = require("express");
const router = Router();

const sindicatosController = require("../../controllers/gastosController/sindicatosController");

router.get("/sindicatos", sindicatosController.getAll);

router.get("/sindicatos/:id/detalles", sindicatosController.getOneByPK);

router.get("/sindicatos/crear", sindicatosController.create);

module.exports = router;