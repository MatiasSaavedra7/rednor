const { Router } = require("express");
const router = Router();

const controller = require("../controllers/usuariosController");
const validateRegistroMiddleware = require("../middlewares/validateUsuarioMiddleware");
// const validateLoginMiddleware = require('../middlewares/validateLoginMiddleware');

router.get("/registro", controller.mostrarRegistro);

router.post("/registro", validateRegistroMiddleware, controller.registrarUsuario);

router.get("/verificar/:token", controller.verificarUsuario);

router.get("/login", controller.mostrarLogin);

router.post("/login", controller.logUsuario);

router.get("/logout", controller.cerrarSesion);  

module.exports = router;
