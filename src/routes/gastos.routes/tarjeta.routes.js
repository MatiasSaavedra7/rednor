const { Router } = require("express");
const router = Router();

const tarjetaVisaController = require("../../controllers/gastosController/tarjetaVisaController");

router.get("/tarjeta-visa", tarjetaVisaController.getAll);

router.get("/tarjeta-visa/:id/detalles", tarjetaVisaController.getOneByPK);

router.get("/tarjeta-visa/crear", tarjetaVisaController.create);

module.exports = router;