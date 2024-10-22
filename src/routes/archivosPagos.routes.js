const { Router } = require("express");
const router = Router();

const controller = require("../controllers/archivosPagosController");
const upload = require("../middlewares/multerMiddleware");

// router.post("/archivos/pagos", upload.single("archivo"), controller.subirArchivoPagos);

router.post("/pagos", upload.array("archivos_pagos", 10), controller.almacenarArchivos);

module.exports = router;