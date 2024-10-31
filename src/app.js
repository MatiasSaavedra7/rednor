require("dotenv").config();
// MODULOS
const express = require("express");
const session = require("express-session");
const path = require("path");
const methodOverride = require("method-override");

// MIDDLEWARES
const controlVencimientos = require("../src/middlewares/controlFechaAlquileresMiddleware");
const userLogged = require("../src/middlewares/userLoggedMiddleware");


// RUTAS
const routes = require("./routes/index.routes");

const app = express();

// DEFINICION DEL PUERTO
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

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
// app.use(controlVencimientos);

// MIDDLEWARE PARA CONTROL DEL USUARIO LOGEADO
app.use(userLogged);

// RUTAS
app.use("/", routes);

app.use((req, res, next) => {
	res.status(404).render("errors/error404.ejs");
});

app.use((req, res, next) => {
	res.status(500).render("errors/error500.ejs");
});

// SERVIDOR
app.listen(PORT, HOST ,() => {
  console.log(`Servidor corriendo http://${HOST}:${PORT}/`);
});
