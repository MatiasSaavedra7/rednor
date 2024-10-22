const { Router } = require("express");
const router = Router();

const controller = require("../controllers/gastosController");
const archivosController = require("../controllers/archivosPagosController");
const upload = require("../middlewares/multerMiddleware");

//  Pagina principal de gastos
router.get("/", controller.mainGastos);

//  Detalle de una categoria de gastos específica
router.get("/:idCategoria/detalle", controller.detalleCategoria);

//  Registro de gastos
router.get("/:idCategoria/servicio/crear", controller.registroGastos);
router.post("/:idCategoria/servicio/crear", controller.almacenarGastos);

//  Detalle de gastos
router.get("/:idCategoria/servicio/:idServicio/pagos", controller.detalleGasto);
//  Detalle de pagos
router.get("/pago/:idPago", controller.detallePago);

//  Almacenar nuevo pago de un servicio/gasto
router.post("/:idCategoria/servicio/:idServicio/nuevo-pago", controller.nuevoPago);

//  Almacenar archivos de un pago
router.post("/:idCategoria/servicio/:idServicio/pagos/almacenar-archivos", upload.array("archivos_pagos", 10), archivosController.almacenarArchivos);

//  Eliminar un archivo de un pago
router.delete("/pagos/eliminar-archivo/:id", archivosController.eliminarArchivo);


module.exports = router;
