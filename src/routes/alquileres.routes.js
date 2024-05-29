const { Router } = require("express");
const router = Router();

const controller = require("../controllers/alquileresController");

const validateMiddleware = require("../middlewares/validateAlquilerMiddleware");

router.get("/", controller.alquileres);

router.get("/detalles/:id", controller.detalleAlquiler);

router.get("/crear", controller.create);

router.post("/crear", validateMiddleware, controller.store);

router.put("/finalizar/:id", controller.finalizarContrato);

module.exports = router;
