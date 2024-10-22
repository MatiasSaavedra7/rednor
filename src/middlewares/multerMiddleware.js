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
