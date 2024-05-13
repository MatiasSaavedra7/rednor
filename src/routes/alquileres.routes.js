const { Router } = require("express");
const router = Router();

const controller = require("../controllers/alquileresController");

router.get("/", controller.getAll);

router.get("/detalles/:id", controller.getOneByPk);

router.get("/crear", controller.create);

router.post("/crear", controller.store);

module.exports = router;
