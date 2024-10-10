// MODULOS
const express = require("express");
const session = require("express-session");
const path = require("path");
const methodOverride = require("method-override");

// MIDDLEWARES
const controlVencimientos = require("../src/middlewares/controlFechaAlquileresMiddleware");
const userLogged = require("../src/middlewares/userLoggedMiddleware");
// const authMiddleware = require("../src/middlewares/authMiddleware");

// RUTAS
const routes = require("./routes/index.routes");

const app = express();

// DEFINICION DEL PUERTO
const PORT = 3000;

// RECURSOS ESTÁTICOS.
app.use(express.static(path.join(__dirname, "../public")));

// MOTOR DE PLANTILLAS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// CAPTURAR LA INFORMACION
// Para poder trabajar con los datos que se envian desde el formulario es necesario configurar el entorno de nuestra aplicacion para que sea capaz de capturar esa informacion.
// De esta forma le estamos aclarando a la aplicacion que todo aquello que llegue desde un formulario, queremos capturarlo en forma de objeto literal, y a su vez, tener la posibilidad de convertir esa informacion en un formato JSON, en caso de ser necesario.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// METHOD-OVERRIDE PARA TRABAJAR CON PETICIONES PUT Y DELETE
app.use(methodOverride("_method"));

// EXPRESS-SESSION
app.use(
  session({
    name: "rednor_secret",
    secret: "rednor secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 horas
    },
  })
);

// MIDDLEWARE PARA EL CONTROL DE LAS FECHAS DE VENCIMIENTO
app.use(controlVencimientos);

// MIDDLEWARE PARA CONTROL DEL USUARIO LOGEADO
app.use(userLogged);

// app.use((req, res, next) => {
//   if (req.path.startsWith("/usuarios") || req.path === "/" || req.path === "/autorizacio-pendiente") {
//     return next();
//   }
//   authMiddleware(req, res, next);
// })

// RUTAS
app.use("/", routes);

// SERVIDOR
app.listen(PORT, "0.0.0.0" ,() => {
  console.log(`Servidor corriendo http://0.0.0.0:${PORT}/`);
});
