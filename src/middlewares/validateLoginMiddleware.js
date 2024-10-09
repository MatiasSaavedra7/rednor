const { check } = require('express-validator');

module.exports = [
  check('email')
    .notEmpty()
    .withMessage("Debes ingresar un correo")
    .isEmail()
    .withMessage("El correo ingresado no es válido"),
  check('password')
    .notEmpty()
    .withMessage('Debes ingresar una contraseña')
];
