const { Router } = require("express");
const router = Router();

const controller = require("../controllers/rentasController");

router.get("/rentas", controller.inicio);

router.get("/automation", controller.automation);

module.exports = router;