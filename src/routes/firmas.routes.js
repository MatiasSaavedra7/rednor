const { Router } = require("express");
const router = Router();

const firmasController = require("../controllers/firmasController");

router.get("/", firmasController.getFirmas);

module.exports = router;