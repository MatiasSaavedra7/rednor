const { Router } = require("express");
const router = Router();

const controller = require("../controllers/alquileresController");

const validateMiddleware = require("../middlewares/validateAlquilerMiddleware");
const validateReajusteMiddleware = require("../middlewares/validateReajusteAlquiler");
const validateEditMiddleware = require("../middlewares/validateEditAlquilerMiddleware");
const cookieFirmaMiddleware = require("../middlewares/cookieFirmaMiddleware");

// Listado de alquileres activos
router.get("/", cookieFirmaMiddleware ,controller.alquileres);

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

router.delete("/eliminar/:id", controller.delete);

// Cambiar equipo de un alquiler
router.put("/cambiar-equipo/:id", controller.cambiarEquipo);

// Endpoint para obtener la cantidad total de alquileres activos
router.get("/api/count", controller.getCantidadTotalAlquileres);
module.exports = router;
