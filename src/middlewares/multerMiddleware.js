const multer = require("multer");

// Configuración de Multer para cada tipo de archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = "";
    switch (file.fieldname) {
      case "inscripcion_afip":
        path = "./public/docs/inscripciones";
        break;
      case "condicion_afip":
        path = "./public/docs/condicion";
        break;
      case "formulario_005":
        path = "./public/docs/formulario005";
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

// Ruta para manejar la carga de archivos
// app.post('/upload', upload.fields([
//   { name: 'inscripcion_afip', maxCount: 1 },
//   { name: 'condicion_afip', maxCount: 1 },
//   { name: 'formulario_005', maxCount: 1 }
// ]), (req, res) => {
// Aquí puedes manejar los archivos cargados como prefieras
//   res.send('Archivos cargados con éxito');
// });
