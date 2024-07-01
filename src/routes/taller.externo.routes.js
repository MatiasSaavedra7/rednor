const { Router } = require("express");
const router = Router();

const controller = require("../controllers/tallerExternosController");

router.get("/", controller.taller);

router.get("/detalle/:id", controller.detalle);

router.get("/ingresos", controller.ingreso);

router.post("/ingresos", controller.almacenarIngreso);

router.get("/egresos/:id", controller.egreso);

router.post("/egresos/:id", controller.almacenarEgreso);

module.exports = router;
