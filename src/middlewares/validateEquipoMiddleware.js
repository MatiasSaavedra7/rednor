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
  check("id_tipo_equipo")
    .notEmpty()
    .withMessage("Selecciona un tipo de las opciones"),
];