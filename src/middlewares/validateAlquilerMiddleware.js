const { check } = require("express-validator");

module.exports = [
  // check("id_cliente")
    // .notEmpty()
    // .withMessage("Debes seleccionar un cliente"),
  check("id_equipo")
    .notEmpty()
    .withMessage("Debes seleccionar un equipo"),
  check("firma")
    .notEmpty()
    .withMessage("Debes seleccionar una firma"),
  check("departamento")
    .notEmpty()
    .withMessage("Debes ingresar el departamento de la operacion")
]