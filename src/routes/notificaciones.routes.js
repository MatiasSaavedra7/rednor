const { Router } = require('express')
const router = Router();

// Notifications controller
const notificacionesController = require("../controllers/notificacionesController");

// GET all notifications
router.get("/", notificacionesController.getAll);

// GET all notifications not readed
router.get("/no-leidas", notificacionesController.getAllNoLeidas);

// PUT notification read
router.put("/:id/marcar-leida", notificacionesController.marcarLeida);

module.exports = router;