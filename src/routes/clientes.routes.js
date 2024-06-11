const { Router } = require("express");
const router = Router();

const controller = require("../controllers/clientesController");

const validateMiddleware = require("../middlewares/validateClienteMiddleware");

// LISTADO COMPLETO DE CLIENTES
router.get("/", controller.clientes);

// CLIENTE POR CLAVE PRIMARIA
router.get("/detalle/:id", controller.detalleCliente);

// FORMULARIO PARA CREACION DE UN NUEVO CLIENTE
router.get("/crear", controller.create);

// RUTA POR POST PARA PROCESAR LOS DATOS RECIBIDOS
router.post("/crear", validateMiddleware, controller.store);

// FORMULARIO PARA LA EDICION DE UN CLIENTE
router.get("/editar/:id", controller.edit);

// RUTA POR PUT PARA PROCESAR LOS DATOS RECIBIDOS
router.put("/editar/:id", controller.edit);

// RUTA AL FORMULARIO PARA REGISTRAR HABILITADOS
router.get("/habilitados", controller.registroHabilitado);

module.exports = router;
