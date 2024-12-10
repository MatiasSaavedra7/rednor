const { Router } = require("express");
const router = Router();

const controller = require("../controllers/tallerController");

// 
router.get("/", controller.taller);

// DETALLE COMPLETO DE UN EQUIPO EN EL TALLER
router.get("/detalle/:id", controller.detalle);

// FORMULARIO DE INGRESO AL TALLER
router.get("/ingreso/:id", controller.ingreso);

// ALMACENAR INGRESO
router.post("/ingreso/:id", controller.almacenarIngreso);

// EDITAR INGRESO
router.get("/ingreso/:id/editar", controller.editarIngreso);

// ACTUALIZAR INGRESO
router.put("/ingreso/:id/editar", controller.actualizarIngreso);

// FORMULARIO DE EGRESO DEL TALLER
router.get("/egreso/:id", controller.egreso);

// ALMACENAR EGRESO
router.post("/egreso/:id", controller.almacenarEgreso);

// FORMULARIO DE INFORME
router.get("/informe/:id", controller.informe);

// ALMACENAR INFORME
router.post("/informe/:id", controller.almacenarInforme);

// EDITAR INFORME
router.get("/informe/:id/editar", controller.editarInforme);

// ACTUALIZAR INFORME
router.put("/informe/:id/editar", controller.actualizarInforme);

// FORMULARIO DE INFORME DE INSUMOS
router.get("/:idInforme/insumos/crear", controller.insumos);

// ALMACENAR INFORME DE INSUMOS
router.post("/:idInforme/insumos/crear", controller.almacenarInsumos);

module.exports = router;