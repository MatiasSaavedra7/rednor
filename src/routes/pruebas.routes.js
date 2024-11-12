const { Router } = require("express");
const router = Router();

const controller = require("../controllers/pruebasController.js");

router.get("/", controller.getAll);

module.exports = router;
