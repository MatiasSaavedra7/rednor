const { Router } = require('express')
const router = Router();

const alquileresController = require('../controllers/alquileres');

router.get('/', alquileresController.getAll);

router.get('/detalles/:id', alquileresController.getOneByPk);

router.get('/crear', alquileresController.create);

module.exports = router