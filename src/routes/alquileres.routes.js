const { Router } = require("express");
const router = Router();

const controller = require("../controllers/alquileresController");

const validateMiddleware = require("../middlewares/validateAlquilerMiddleware");
const validateReajusteMiddleware = require("../middlewares/validateReajusteAlquiler");
const validateEditMiddleware = require("../middlewares/validateEditAlquilerMiddleware");

// Listado de alquileres activos
router.get("/", controller.alquileres);

// Listado de alquileres vencidos
router.get("/finalizados", controller.finalizados);

router.get("/detalles/:id", controller.detalleAlquiler);

router.get("/crear", controller.create);

router.post("/crear", validateMiddleware, controller.store);

router.get("/reajuste/:id", controller.reajuste);

router.put("/reajuste/:id", validateReajusteMiddleware, controller.actualizarContrato);

router.put("/finalizar/:id", controller.finalizarContrato);

router.get("/editar/:id", controller.edit);

router.put("/editar/:id", validateEditMiddleware, controller.update);

module.exports = router;
