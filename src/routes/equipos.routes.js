const { Router } = require("express");
const router = Router();

const controller = require("../controllers/equiposController");

const validateMiddleware = require("../middlewares/validateEquiposMiddleware");

// LISTADO COMPLETO DE EQUIPOS
router.get("/", controller.getAll);

// DETALLE DE EQUIPO POR CLAVE PRIMARIA
router.get("/detalle/:id", controller.getOneByPk);

// FORMULARIO PARA REGISTRAR UN NUEVO EQUIPO
router.get("/crear", controller.create);

// RUTA POR POST PARA PROCESAR LOS DATOS RECIBIDOS
router.post("/crear", validateMiddleware, controller.store);

// FORMULARIO PARA LA EDICION DE UN CLIENTE
router.get("/editar/:id", controller.edit);

// RUTA POR PUT PARA PROCESAR LOS DATOS RECIBIDOS
router.put("/editar/:id", controller.edit);

module.exports = router;
