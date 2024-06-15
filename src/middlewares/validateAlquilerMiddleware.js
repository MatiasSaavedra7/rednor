const { check } = require("express-validator");

module.exports = [
  check("id_equipo")
    .notEmpty()
    .withMessage("Debes seleccionar un equipo"),
  check("minimo_copias")
    .notEmpty()
    .withMessage("Ingresa la cantidad minima de copias"),
  check("precio_copias")
    .notEmpty()
    .withMessage("Ingresa el precio por cada copia"),
  check("firma")
    .notEmpty()
    .withMessage("Debes seleccionar una firma"),
  check("departamento")
    .notEmpty()
    .withMessage("Debes ingresar el departamento de la operacion")
]