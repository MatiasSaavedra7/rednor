const { Router } = require("express");
const router = Router();

const controller = require("../controllers/pagosController");

// NUEVO MODULO
// Pagos de Servicios
const pagosServiciosController = require("../controllers/pagosController/pagosServiciosController")

// Pagos de Planes de Pago & Moratorias
const pagosPlanesController = require("../controllers/pagosController/pagosPlanesController")

// Multer middleware
const upload = require("../middlewares/multerMiddleware");

// router.get("/cheques/registro", controller.registroCheques);

// Detalle de un pago
router.get("/:idPago", controller.getPagoById);

// Editar un pago
router.get("/:idPago/editar", controller.editarPago);

// Actualizar un pago
router.put("/:idPago/editar", controller.actualizarPago);

// Eliminar un pago
router.delete("/:idPago/eliminar", controller.eliminarPago);

module.exports = router;