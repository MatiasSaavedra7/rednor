const { Router } = require("express");
const router = Router();

// Multer middleware
const upload = require("../../middlewares/multerMiddleware");

// Honorarios controller
const honorariosController = require("../../controllers/gastosController/honorariosController");


router.get("/honorarios", honorariosController.getAll);

router.get("/honorarios/:id/detalles", honorariosController.getOneByPK);

router.get("/honorarios/crear", honorariosController.create);

router.post("/honorarios/crear", honorariosController.store);

router.get("/honorarios/:id/editar", honorariosController.edit);

router.put("/honorarios/:id/editar", honorariosController.update);

router.post("/honorarios/almacenar-archivos", upload.array("archivos_honorarios", 10), honorariosController.almacenarArchivos);

router.delete("/honorarios/eliminar-archivo/:id", honorariosController.eliminarArchivo);

module.exports = router;


