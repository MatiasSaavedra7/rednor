const { Router } = require('express')
const router = Router();

const clientesController = require('../controllers/clientes');

// LISTADO COMPLETO DE CLIENTES
router.get('/', clientesController.getAll);

// CLIENTE POR CLAVE PRIMARIA
router.get('/detalle/:id', clientesController.getOneByPk)

// FORMULARIO PARA CREACION DE UN NUEVO CLIENTE
router.get('/crear', clientesController.create)

// RUTA POR POST PARA PROCESAR LOS DATOS RECIBIDOS
router.post('/crear', clientesController.store)

// FORMULARIO PARA LA EDICION DE UN CLIENTE
router.get('/editar/:id', clientesController.edit)

// RUTA POR PUT PARA PROCESAR LOS DATOS RECIBIDOS
router.put('/editar/:id', clientesController.edit)


module.exports = router;