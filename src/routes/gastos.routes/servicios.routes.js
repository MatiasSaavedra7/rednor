const { Router } = require("express");
const router = Router();

// Multer middleware para subir los archivos al servidor
const upload = require("../../middlewares/multerMiddleware");

// Servicios controller
const serviciosController = require("../../controllers/gastosController/serviciosController");

router.get("/servicios", serviciosController.getAll);

router.get("/servicios/:id/detalles", serviciosController.getOneByPK);

router.get("/servicios/crear", serviciosController.create);

router.post("/servicios/crear", serviciosController.store);

router.get("/servicios/:id/editar", serviciosController.edit);

router.put("/servicios/:id/editar", serviciosController.update);

router.post("/servicios/almacenar-archivos", upload.array("archivos_servicios", 10), serviciosController.almacenarArchivos);

router.delete("/servicios/eliminar-archivo/:id", serviciosController.eliminarArchivo);

module.exports = router;