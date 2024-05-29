const { check } = require("express-validator");

module.exports = [
  check("marca")
    .notEmpty()
    .withMessage("Selecciona una marca en las opciones"),
  check("modelo")
    .notEmpty()
    .withMessage("Debes ingresar el nombre del modelo"),
  check("numero_serie")
    .notEmpty()
    .withMessage("Debes ingresar el numero de serie"),
  check("precio")
    .notEmpty()
    .withMessage("Debes ingresar el precio del equipo"),
  check("minimo_copias")
    .notEmpty()
    .withMessage("Debes ingresar la cantidad minima de copias"),
  check("precio_copias")
    .notEmpty()
    .withMessage("Debes ingresar el precio por cada copia"),
  check("fecha_reajuste")
    .notEmpty()
    .withMessage("Selecciona la fecha para reajuste del equipo"),
];