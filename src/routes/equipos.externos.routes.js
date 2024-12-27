const { Router } = require("express");
const router = Router();

const controller = require("../controllers/equiposExternosController");
const validateEquipoMiddleware = require("../middlewares/validateEquipoMiddleware")

// LISTADO COMPLETO DE EQUIPOS EXTERNOS
router.get("/", controller.getAll);

// OBTENER UN EQUIPO EXTERNO POR SU ID
router.get("/:id/detalle", controller.getOneByPK);

// EDITAR UN EQUIPO EXTERNO
router.get("/:id/editar", controller.edit);
router.put("/:id/editar", validateEquipoMiddleware, controller.update);

// CREAR UN NUEVO EQUIPO EXTERNO
router.get("/crear", controller.create);
router.post("/crear", controller.store);

// INFORMACION DE TALLER
router.get("/:idEquipo/historial-taller", controller.getHistorialTaller);

// DETALLE HISTORIAL TALLER
router.get("/detalle-taller/:idIngreso", controller.getDetalleHistorialTaller);

module.exports = router;