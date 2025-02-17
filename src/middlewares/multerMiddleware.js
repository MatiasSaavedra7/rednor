const multer = require("multer");

// Configuración de Multer para cada tipo de archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = "";
    switch (file.fieldname) {
      case "inscripcion_afip":
        path = "./public/docs/inscripciones";
        break;
      case "formulario_005":
        path = "./public/docs/formulario005";
        break;
      case "archivos_pagos":
        path = "./public/docs/pagos";
        break;
      case "archivos_gastos":
        path = "./public/docs/gastos";
        break;
      // NUEVO MODULO
      case "archivos_servicios":
        path = "./public/docs/servicios";
        break;
      case "pagos_servicios":
        path = "./public/docs/pagos_servicios";
        break;
      case "archivos_honorarios":
        path = "./public/docs/honorarios";
        break;
      case "pagos_honorarios":
        path = "./public/docs/pagos_honorarios";
        break;
      default:
        path = "./public/docs/default"; //  Default path
        break;
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
