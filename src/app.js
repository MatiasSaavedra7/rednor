const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const controlVencimientos = require("../src/middlewares/controlFechaAlquileresMiddleware");

const app = express();

// RECURSOS ESTÁTICOS.
app.use(express.static(path.join(__dirname, "../public")));

// MOTOR DE PLANTILLAS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// CAPTURAR LA INFORMACION
// Para poder trabajar con los datos que se envian desde el formulario es necesario configurar el entorno de nuestra aplicacion para que sea capaz de capturar esa informacion.
// De esta forma le estamos aclarando a la aplicacion que todo aquello que llegue desde un formulario, queremos capturarlo en forma de objeto literal, y a su vez, tener la posibilidad de convertir esa informacion en un formato JSON, en caso de ser necesario.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// METHOD-OVERRIDE PARA TRABAJAR CON PETICIONES PUT Y DELETE
app.use(methodOverride("_method"));

// MIDDLEWARE PARA EL CONTROL DE LAS FECHAS DE VENCIMIENTO
app.use(controlVencimientos);

// DEFINICION DEL PUERTO
const PORT = 3000;

// REQUERIMIENTO DE LAS RUTAS
const routes = require("./routes/index.routes");
app.use("/", routes);

// SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor corriendo http://localhost:${PORT}/`);
});
