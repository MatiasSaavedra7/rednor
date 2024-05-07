const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// RECURSOS ESTÁTICOS.
app.use(express.static(path.join(__dirname, '../public')));

// MOTOR DE PLANTILLAS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// METHOD-OVERRIDE PARA TRABAJAR CON PETICIONES PUT Y DELETE
app.use(methodOverride('_method'));

// DEFINICION DEL PUERTO
const PORT = 3000;

// REQUERIMIENTO DE LAS RUTAS
const routes = require('./routes/index');
app.use('/', routes);

// SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo http://localhost:${PORT}/`);
})