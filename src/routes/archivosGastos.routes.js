const { Router } = require("express");
const router = Router();

const controller = require("../controllers/archivosGastosController");
const upload = require("../middlewares/multerMiddleware");

// Traer todos los archivos de un gasto
router.get("/:idGasto", controller.getAllByIdGasto);

// Almacenar archivos de un gasto
router.post("/almacenar", upload.array("archivos_gastos", 10), controller.almacenarArchivos);

// Eliminar un archivo de un gasto
router.delete("/eliminar/:id", controller.eliminarArchivo);

module.exports = router;