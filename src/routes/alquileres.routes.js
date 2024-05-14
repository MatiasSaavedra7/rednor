const { Router } = require("express");
const router = Router();

const controller = require("../controllers/alquileresController");

const validateMiddleware = require("../middlewares/validateAlquilerMiddleware");

router.get("/", controller.getAll);

router.get("/detalles/:id", controller.getOneByPk);

router.get("/crear", controller.create);

router.post("/crear", validateMiddleware, controller.store);

module.exports = router;
