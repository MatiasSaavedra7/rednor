const { Router } = require("express");
const router = Router();

const controller = require("../controllers/clientesController");
const upload = require("../middlewares/multerMiddleware");

const validateMiddleware = require("../middlewares/validateClienteMiddleware");

// LISTADO COMPLETO DE CLIENTES
router.get("/", controller.clientes);

// CLIENTE POR CLAVE PRIMARIA
router.get("/detalle/:id", controller.detalleCliente);

// FORMULARIO PARA CREACION DE UN NUEVO CLIENTE
router.get("/crear", controller.create);

// RUTA POR POST PARA PROCESAR LOS DATOS RECIBIDOS
router.post(
  "/crear",
  upload.fields([
    { name: "inscripcion_afip", maxCount: 1 },
    // { name: "condicion_afip", maxCount: 1 }, //  Borrar esta opcion, condicion_afip no es un archivo.
    { name: "formulario_005", maxCount: 1 },
  ]),
  validateMiddleware,
  controller.store
);

// ELIMINAR CLIENTE
router.delete("/eliminar/:id", controller.delete);

// Ruta para subir archivo Inscripcion AFIP
router.post("/detalle/:id/subir-inscripcion-afip", upload.single("inscripcion_afip"), controller.subirInscripcionAFIP);

// Ruta para eliminar archivo Inscripcion AFIP
router.delete("/detalle/:id/eliminar-inscripcion-afip", controller.eliminarInscripcionAFIP);

// Ruta para subir archivo Formulario 005
router.post("/detalle/:id/subir-formulario-005", upload.single("formulario_005"), controller.subirFormulario005);

// Ruta para eliminar archivo Formulario 005
router.delete("/detalle/:id/eliminar-formulario-005", controller.eliminarFormulario005);

// FORMULARIO PARA LA EDICION DE UN CLIENTE
router.get("/editar/:id", controller.edit);

// RUTA POR PUT PARA PROCESAR LOS DATOS RECIBIDOS
router.put("/editar/:id",
  upload.fields([
  { name: "inscripcion_afip", maxCount: 1 },
  { name: "condicion_afip", maxCount: 1 },
  { name: "formulario_005", maxCount: 1 },
  ]),
  validateMiddleware,
  controller.update
);

router.get("/api/count", controller.getCantidadTotalClientes);

module.exports = router;
