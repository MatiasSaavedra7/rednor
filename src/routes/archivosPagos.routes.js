const { Router } = require("express");
const router = Router();

const controller = require("../controllers/archivosPagosController");
const upload = require("../middlewares/multerMiddleware");

// Rutas ("Todas comienzan con /archivos-pagos")

// Almacenar archivos de un pago
router.post("/almacenar", upload.array("archivos_pagos", 10), controller.almacenarArchivos);

// Eliminar un archivo de un pago
router.delete("/eliminar/:id", controller.eliminarArchivo);

module.exports = router;