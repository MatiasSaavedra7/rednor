const { Router } = require('express')
const router = Router();

const controller = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, controller.index);

router.get("/autorizacion-pendiente", controller.autorizacionPendiente);

module.exports = router;