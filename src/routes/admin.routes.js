const { Router } = require("express");
const router = Router();

const adminController = require("../controllers/adminController");

router.get("/usuarios", adminController.getAll);

module.exports = router;
