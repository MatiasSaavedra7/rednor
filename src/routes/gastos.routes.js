const { Router } = require("express");
const router = Router();

const controller = require("../controllers/gastosController");

//  Pagina principal de gastos
router.get("/", controller.mainGastos);

//  Detalle de una categoria de gastos específica
router.get("/:idCategoria/detalle", controller.detalleCategoria);

//  Registro de gastos
router.get("/:idCategoria/servicio/crear", controller.registroGastos);
router.post("/:idCategoria/servicio/crear", controller.almacenarGastos);

//  Detalle de gastos
router.get("/:idCategoria/servicio/:idServicio/pagos", controller.detalleGasto);
//  Detalle de pagos
router.get("/pago/:idPago", controller.detallePago);


module.exports = router;
