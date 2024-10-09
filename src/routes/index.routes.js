const { Router } = require("express");
const router = Router();

//  Rutas
const main = require("./main.routes.js");
const admin = require('./admin.routes.js');
const usuarios = require('./usuarios.routes.js');
const clientes = require("./clientes.routes.js");
const habilitados = require("./habilitados.routes.js");
const equipos = require("./equipos.routes.js");
const alquileres = require("./alquileres.routes.js");
const repuestos = require("./repuestos.routes.js");
const taller = require("./taller.routes.js");
const pagos = require("./pagos.routes.js");
const externos = require('./taller.externo.routes.js');
const gastos = require('./gastos.routes.js');

//  Rutas para pruebas
const pruebas = require("./pruebas.routes.js");

//  Middlewares
const adminMiddleware = require("../middlewares/adminMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// Main routes
router.use("/", main);

// Admin routes
router.use("/admin", authMiddleware, adminMiddleware, admin);

// Clientes routes
router.use("/clientes", authMiddleware, clientes);

// Personas habilitadas routes
router.use("/habilitados", authMiddleware, habilitados);

// Equipos routes
router.use("/equipos", authMiddleware, equipos);

// Alquileres routes
router.use("/alquileres", authMiddleware, alquileres);

// Repuesto routes
router.use("/repuestos", authMiddleware, repuestos);

// Taller routes
router.use("/taller", authMiddleware, taller);

// Taller externos routes
router.use("/taller/externos", authMiddleware, externos);

// Usuarios routes
router.use("/usuarios", usuarios);

// Pruebas routes
router.use("/pruebas", pruebas);

// Pagos routes
router.use("/pagos", authMiddleware, pagos);

// Gastos routes
router.use("/gastos", authMiddleware, gastos);

module.exports = router;
