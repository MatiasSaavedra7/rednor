const { Router } = require("express");
const router = Router();

const controller = require("../controllers/tallerExternosController");
const validateMiddleware = require('../middlewares/validateEquipoMiddleware');

router.get("/", controller.taller);

router.get("/detalle/:id", controller.detalle);

// CREAR EQUIPO
router.get("/equipos/crear", controller.crearEquipo);

router.post("/equipos/crear", validateMiddleware, controller.guardarEquipo);

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

// INFORMAR EL COBRO DE UN ARREGLO
router.put("/informar-cobro/:idEgreso", controller.informarCobro);

// ENTREGA DE INSUMOS
router.get("/:idInforme/insumos/crear", controller.insumos);

router.post("/:idInforme/insumos/crear", controller.almacenarInsumos);

module.exports = router;
