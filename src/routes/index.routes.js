const { Router } = require("express");
const router = Router();

//  Rutas
const main = require("./main.routes.js");
const admin = require('./admin.routes.js');
const usuarios = require('./usuarios.routes.js');
const clientes = require("./clientes.routes.js");
const habilitados = require("./habilitados.routes.js");
const equipos = require("./equipos.routes.js");
const equiposExternos = require("./equipos.externos.routes.js");
const alquileres = require("./alquileres.routes.js");
const repuestos = require("./repuestos.routes.js");
const taller = require("./taller.routes.js");
const pagos = require("./pagos.routes.js");
const externos = require('./taller.externo.routes.js');
const gastos = require('./gastos.routes.js');
const archivosPagos = require("./archivosPagos.routes.js");
const archivosGastos = require("./archivosGastos.routes.js");

const notificaciones = require("./notificaciones.routes.js");

//  Rutas para pruebas
const pruebas = require("./pruebas.routes.js");

//  Middlewares
//  Middleware autenticacion
const authMiddleware = require("../middlewares/authMiddleware.js");
//  Middleware para controlar el acceso a rutas segun el rol.
const roleMiddleware = require("../middlewares/roleMiddleware.js");
//  ROLES
//  1 - Admin
//  2 - Moderador
//  3 - Tecnico
//  4 - Invitado

// Main routes
router.use("/", main);

// Admin routes
router.use("/admin", authMiddleware, roleMiddleware([1]), admin);

// Clientes routes
router.use("/clientes", authMiddleware, roleMiddleware([1, 2]), clientes);

// Personas habilitadas routes
router.use("/habilitados", authMiddleware, roleMiddleware([1, 2]), habilitados);

// Equipos routes
router.use("/equipos", authMiddleware, roleMiddleware([1, 2]), equipos);

// Equipos externos routes
router.use("/equipos-externos", authMiddleware, roleMiddleware([1, 2]), equiposExternos);

// Alquileres routes
router.use("/alquileres", authMiddleware, roleMiddleware([1, 2]), alquileres);

// Repuesto routes
router.use("/repuestos", authMiddleware, roleMiddleware([1]), repuestos);

// Taller routes
router.use("/taller", authMiddleware, roleMiddleware([1, 2]), taller);

// Taller externos routes
router.use("/taller/externos", authMiddleware, roleMiddleware([1, 2]), externos);

// Pagos routes
router.use("/pagos", authMiddleware, roleMiddleware([1]), pagos);

// Gastos routes
router.use("/gastos", authMiddleware, roleMiddleware([1]), gastos);

// Usuarios routes
router.use("/usuarios", usuarios);

// Archivo de pagos routes
router.use("/archivos-pagos", archivosPagos);

// Archivo de gastos routes
router.use("/archivos-gastos", archivosGastos);

// Notificaciones
router.use("/notificaciones", notificaciones);

// Pruebas routes
router.use("/pruebas", pruebas);

module.exports = router;
