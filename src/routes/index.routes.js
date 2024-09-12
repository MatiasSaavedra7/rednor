const { Router } = require("express");
const router = Router();

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

const pruebas = require("./pruebas.routes.js");

// Main routes
router.use("/", main);

// Admin routes
router.use("/admin", admin);

// Clientes routes
router.use("/clientes", clientes);

// Personas habilitadas routes
router.use("/habilitados", habilitados);

// Equipos routes
router.use("/equipos", equipos);

// Alquileres routes
router.use("/alquileres", alquileres);

// Repuesto routes
router.use("/repuestos", repuestos);

// Taller routes
router.use("/taller", taller);

// Taller externos routes
router.use("/taller/externos", externos);

// Usuarios routes
router.use("/usuarios", usuarios);

// Pruebas routes
router.use("/pruebas", pruebas);

// Pagos routes
router.use("/pagos", pagos);

module.exports = router;
