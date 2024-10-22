const { Router } = require("express");
const router = Router();

const validateMiddleware = require("../middlewares/validateHabilitadosMiddleware");

const controller = require("../controllers/habilitadosController");

// RUTA AL FORMULARIO PARA REGISTRAR HABILITADOS
router.get("/crear", controller.create);

router.post("/crear", validateMiddleware, controller.store);

router.get("/editar/:id", controller.edit);

router.put("/editar/:id", validateMiddleware, controller.update);

router.delete("/eliminar/:id", controller.delete);

module.exports = router;
