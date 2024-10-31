const { Router } = require("express");
const router = Router();

const controller = require("../controllers/gastosController");
const archivosController = require("../controllers/archivosPagosController");
const upload = require("../middlewares/multerMiddleware");

//  Pagina principal de gastos
router.get("/", controller.mainGastos);

//  Detalle de una categoria de gastos específica, muestra todos los gastos/servicios que pertenecen a esta categoria
router.get("/:idCategoria", controller.detalleCategoria);

//  Registro de gastos
router.get("/:idCategoria/crear", controller.registroGastos);
router.post("/:idCategoria/crear", controller.almacenarGastos);

//  Detalle de gastos
router.get("/:idCategoria/servicio/:idServicio", controller.detalleGasto);

//  Años disponibles para un gasto/servicio
router.get("/servicio/:idServicio/pagos/anios-disponibles", controller.aniosDisponibles);

//  Pagos de un gasto/servicio en un año específico
router.get("/servicio/:idServicio/pagos/:year", controller.pagosPorAnio);

//  Detalle de pagos
router.get("/pago/:idPago", controller.detallePago);

//  Almacenar nuevo pago de un servicio/gasto
router.post("/:idCategoria/servicio/:idServicio/nuevo-pago", controller.nuevoPago);

// Almacenar archivos de un pago
router.post("/pagos/almacenar-archivos", upload.array("archivos_pagos", 10), archivosController.almacenarArchivos);

//  Eliminar un archivo de un pago
router.delete("/pagos/eliminar-archivo/:id", archivosController.eliminarArchivo);


module.exports = router;
