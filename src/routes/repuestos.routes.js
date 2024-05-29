const { Router } = require("express");
const router = Router();

const controller = require("../controllers/repuestosController");

const validateMiddleware = require("../middlewares/validateCartuchoMiddleware");

router.get("/", controller.repuestos);

router.get("/crear", controller.create);

router.post("/crear", validateMiddleware, controller.store);

module.exports = router;