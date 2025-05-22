const { Router } = require("express");
const router = Router();

const controller = require("../controllers/pruebasController.js");

router.get("/", controller.getAll);

// router.get("/newPassword", controller.newPassword);

module.exports = router;
