const { Router } = require("express");
const router = Router();

// Pagos de Servicios Controller
const pagosServiciosController = require("../../controllers/pagosController/pagosServiciosController");

// Multer middleware
const upload = require("../../middlewares/multerMiddleware");

// Mostrar todos los pagos
router.get("/servicios", pagosServiciosController.getAll);

// Mostrar todos los pagos de un Servicio
router.get("/servicios/:id", pagosServiciosController.getAllByIdServicio);

// Crear un nuevo pago (recibe el id del servicio)
router.post("/servicios/:id/crear", pagosServiciosController.create);

// Mostrar los años disponibles para un servicio
router.get("/servicios/:id/anios-disponibles", pagosServiciosController.getYears);

// Mostrar los pagos de un servicio en un año específico
router.get("/servicios/:id/pagos-anio/:year", pagosServiciosController.getPagosByYear);

// Detalle de un pago
router.get("/servicios/pago/:idPago", pagosServiciosController.getOnePagoByPK);

// Detalle del último pago
router.get("/servicios/:id/ultimo-pago", pagosServiciosController.getLastPagoByIdServicio);

// Subir un archivo a un Pago
router.post("/servicios/almacenar-archivos", upload.array("pagos_servicios", 10), pagosServiciosController.almacenarArchivo);

// Eliminar un archivo de un Pago
router.delete("/servicios/eliminar-archivo/:id", pagosServiciosController.eliminarArchivo);

module.exports = router;