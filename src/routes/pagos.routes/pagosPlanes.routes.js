const { Router } = require("express");
const router = Router();

const pagosPlanesController = require("../../controllers/pagosController/pagosPlanesController");

// Categoria Planes de Pago & Moratorias
// Mostrar todos los pagos
router.get("/planes-pagos", pagosPlanesController.getAll);

// Mostrar un pago a traves de su ID
router.get("/planes-pagos/:idPago", pagosPlanesController.getOneByPK);

// Crear un nuevo pago (recibe el id de la cuota)

module.exports = router;