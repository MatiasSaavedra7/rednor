const { Router } = require("express");
const router = Router();

const controller = require("../controllers/usuariosController");
const validateRegistroMiddleware = require("../middlewares/validateUsuarioMiddleware");
// const validateLoginMiddleware = require('../middlewares/validateLoginMiddleware');

router.get("/registro", controller.formRegistro);

router.post("/registro", validateRegistroMiddleware, controller.registro);

router.get("/login", controller.formLogin);

router.post("/login", controller.login);

router.get("/logout", controller.logout);  

module.exports = router;
