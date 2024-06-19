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
    { name: "condicion_afip", maxCount: 1 },
    { name: "formulario_005", maxCount: 1 },
  ]),
  validateMiddleware,
  controller.store
);

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

module.exports = router;
