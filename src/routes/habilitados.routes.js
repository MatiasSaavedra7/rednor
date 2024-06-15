const { Router } = require("express");
const router = Router();

const validateMiddleware = require("../middlewares/validateHabilitadosMiddleware");

const controller = require("../controllers/habilitadosController");

// RUTA AL FORMULARIO PARA REGISTRAR HABILITADOS
router.get("/crear", controller.create);

router.post("/crear", validateMiddleware, controller.store);

module.exports = router;
