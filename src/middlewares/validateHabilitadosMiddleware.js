const { check } = require("express-validator");

module.exports = [
  check("nombre")
    .notEmpty()
    .withMessage("Debes ingresar un nombre"),
  check("telefono")
    .notEmpty()
    .withMessage("Ingresa un numero de telefono"),
  check("email")
    .notEmpty()
    .withMessage("Ingresar un correo")
    .bail()
    .isEmail()
    .withMessage("Formato de correo no válido"),
  check("puesto")
    .notEmpty()
    .withMessage("Ingresar el puesto del habilitado"),
  check("ubicacion")
    .notEmpty()
    .withMessage("Ingresar la ubicacion del habilitado"),
];
