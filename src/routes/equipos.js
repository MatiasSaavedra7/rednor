const { Router } = require('express')
const router = Router();

const equiposController = require('../controllers/equipos');

// LISTADO COMPLETO DE EQUIPOS
router.get('/', equiposController.getAll);

// DETALLE DE EQUIPO POR CLAVE PRIMARIA
router.get('/detalle/:id', equiposController.getOneByPk)

// FORMULARIO PARA REGISTRAR UN NUEVO EQUIPO
router.get('/crear', equiposController.create)

// RUTA POR POST PARA PROCESAR LOS DATOS RECIBIDOS
router.post('/crear', equiposController.store)

// FORMULARIO PARA LA EDICION DE UN CLIENTE
router.get('/editar/:id', equiposController.edit)

// RUTA POR PUT PARA PROCESAR LOS DATOS RECIBIDOS
router.put('/editar/:id', equiposController.edit)

module.exports = router;