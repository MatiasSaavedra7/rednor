const { Router } = require("express");
const router = Router();

const controller = require("../controllers/equiposController");

const validateMiddleware = require("../middlewares/validateEquipoMiddleware");

// LISTADO COMPLETO DE EQUIPOS
router.get("/", controller.equipos);

// DETALLE DE EQUIPO POR CLAVE PRIMARIA
router.get("/detalle/:id", controller.detalleEquipo);

// FORMULARIO PARA REGISTRAR UN NUEVO EQUIPO
router.get("/crear", controller.create);

// RUTA POR POST PARA PROCESAR LOS DATOS RECIBIDOS
router.post("/crear", validateMiddleware, controller.store);

// FORMULARIO PARA LA EDICION DE UN CLIENTE
router.get("/editar/:id", controller.edit);

// RUTA POR PUT PARA PROCESAR LOS DATOS RECIBIDOS
router.put("/editar/:id", validateMiddleware, controller.update);

// RUTA POR DELETE PARA ELIMINAR UN EQUIPO
router.delete("/eliminar/:id", controller.delete);

module.exports = router;
