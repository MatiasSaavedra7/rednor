const { Router } = require("express");
const router = Router();

const controller = require("../controllers/archivosGastosController");
const upload = require("../middlewares/multerMiddleware");

// Traer todos los archivos de un gasto
router.get("/:idGasto", controller.getAllByIdGasto);

// Almacenar archivos de un gasto
router.post("/almacenar", upload.array("archivos_gastos", 10), controller.almacenarArchivos);

// Eliminar un archivo de un gasto
router.delete("/eliminar/:id", controller.eliminarArchivo);

// Modulo para almacenar los archivos relacionados a un gasto
//* Seccion Servicios
// Traer todos los archivos de un servicio
// router.get("/servicios/:id", controller.getAllByIdServicio);

// Almacenar archivos de un servicio
// router.post("/servicios/almacenar", upload.array("archivos_servicios", 10), controller.almacenarArchivosServicios);

// Eliminar un archivo de un servicio
// router.delete("/servicios/eliminar/:id", controller.eliminarArchivoServicio);


module.exports = router;