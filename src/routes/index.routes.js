const { Router } = require("express");
const router = Router();

const main = require("./main.routes.js");
const clientes = require("./clientes.routes.js");
const equipos = require("./equipos.routes.js");
const alquileres = require("./alquileres.routes.js");
const repuestos = require("./repuestos.routes.js");
const taller = require("./taller.routes.js");

const pruebas = require("./pruebas.routes.js");

// Main routes
router.use("/", main);

// Clientes routes
router.use("/clientes", clientes);

// Equipos routes
router.use("/equipos", equipos);

// Alquileres routes
router.use("/alquileres", alquileres);

// Repuesto routes
router.use("/repuestos", repuestos);

// Taller routes
router.use("/taller", taller);

// Pruebas routes
router.use("/pruebas", pruebas);

module.exports = router;
