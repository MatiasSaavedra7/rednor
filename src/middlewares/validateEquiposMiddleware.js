const { check } = require("express-validator");

module.exports = [
  check("numero_serie")
    .notEmpty()
    .withMessage("Debes ingresar el numero de serie"),
  check("id_marca")
    .notEmpty()
    .withMessage("Selecciona una marca en las opciones"),
  check("modelo").notEmpty().withMessage("Debes ingresar el nombre del modelo"),
  check("precio").notEmpty().withMessage("Debes ingresar el precio del equipo"),
  check("minimo_copias")
    .notEmpty()
    .withMessage("Debes ingresar la cantidad minima de copias"),
  check("precio_copias")
    .notEmpty()
    .withMessage("Debes ingresar el precio por cada copia"),
  check("id_estado")
    .notEmpty()
    .withMessage("Selecciona un estado en las opciones"),
  check("fecha_reajuste")
    .notEmpty()
    .withMessage("Selecciona la fecha para reajuste del equipo"),
];
