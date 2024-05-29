const { Router } = require("express");
const router = Router();

const controller = require("../controllers/tallerController");

router.get("/", controller.taller);

router.get("/detalle/:id", controller.detalle);

router.get("/ingreso/:id", controller.ingreso);

router.post("/ingreso/:id", controller.almacenarIngreso);

router.get("/egreso/:id", controller.egreso);

router.post("/egreso/:id", controller.almacenarEgreso);

module.exports = router;