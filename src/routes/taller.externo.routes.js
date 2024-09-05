const { Router } = require("express");
const router = Router();

const controller = require("../controllers/tallerExternosController");

router.get("/", controller.taller);

router.get("/detalle/:id", controller.detalle);

// GUARDAR UN INGRESO
router.get("/ingresos", controller.ingreso);

router.post("/ingresos", controller.almacenarIngreso);

// EDITAR UN INGRESO
router.get("/:id/editar", controller.editarIngreso);

router.put("/:id/editar", controller.actualizarIngreso);

// GUARDAR UN EGRESO
router.get("/egresos/:id", controller.egreso);

router.post("/egresos/:id", controller.almacenarEgreso);

// GUARDAR UN INFORME
router.get("/informe/:id", controller.informe);

router.post("/informe/:id", controller.almacenarInforme);

// EDITAR INFORME
router.get("/informe/:id/editar", controller.editarInforme);

router.put("/informe/:id/editar", controller.actualizarInforme);

module.exports = router;
