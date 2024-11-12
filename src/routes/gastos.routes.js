const { Router } = require("express");
const router = Router();

const controller = require("../controllers/gastosController");
const pagosController = require("../controllers/pagosController");
const archivosController = require("../controllers/archivosPagosController");
const upload = require("../middlewares/multerMiddleware");

//  Pagina principal de gastos
router.get("/", controller.mainGastos);

//  Detalle de una categoria de gastos específica, muestra todos los gastos/servicios que pertenecen a esta categoria
router.get("/:idCategoria", controller.detalleCategoria);

//  Registrar un gasto/servicio en una categoria
router.get("/:idCategoria/crear", controller.registroGastos);
router.post("/:idCategoria/crear", controller.almacenarGastos);

//  Editar un gasto/servicio
router.get("/:idCategoria/servicio/:idServicio/editar", controller.editarGasto);
router.put("/:idCategoria/servicio/:idServicio/editar", controller.actualizarGasto);

//  Eliminar un gasto/servicio
router.delete("/:idCategoria/servicio/:idServicio/eliminar", controller.eliminarGasto);

//  Detalle de un gasto/servicio
router.get("/:idCategoria/servicio/:idServicio", controller.detalleGasto);

//  Años disponibles para un gasto/servicio
router.get("/servicio/:idServicio/pagos/anios-disponibles", controller.aniosDisponibles);

//  Pagos de un gasto/servicio en un año específico
router.get("/servicio/:idServicio/pagos/:year", controller.pagosPorAnio);

//  Detalle de pagos
router.get("/pago/:idPago", controller.detallePago);

//  Detalle de ultimo pago
router.get("/servicio/:idServicio/ultimo-pago", pagosController.getLastPagoByIdGasto);

//  Almacenar nuevo pago de un servicio/gasto
router.post("/:idCategoria/servicio/:idServicio/nuevo-pago", controller.nuevoPago);

module.exports = router;