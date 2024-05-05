const { Router } = require('express');
const router = Router();

const main = require('./main.js');
const clientes = require('./clientes.js');
const equipos = require('./equipos.js');
const alquileres = require('./alquileres.js');

// Main routes
router.use('/', main);

// Clientes routes
router.use('/clientes', clientes);

// Equipos routes
router.use('/equipos', equipos);

// Alquileres routes
router.use('/alquileres', alquileres);

module.exports = router;