const { check } = require('express-validator');

module.exports = [
  check('usuario')
      .notEmpty().withMessage('Debe ingresar un usuario válido.'),
  check('password')
      .notEmpty().withMessage('Debe ingresar una contraseña'),
]