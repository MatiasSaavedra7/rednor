const { check } = require("express-validator");

module.exports = [
  check("nombre")
    .notEmpty()
    .withMessage("Ingresa un nombre"),
  check("etiqueta")
    .notEmpty()
    .withMessage("Ingresa una etiqueta para el cartucho"),
  check("SKU")
    .notEmpty()
    .withMessage("Debes ingresar el SKU del repuesto"),
  check("stock")
    .notEmpty()
    .withMessage("Debes ingresar el stock"),
  check("categoria")
    .notEmpty()
    .withMessage("Debes seleccionar la categoria del cartucho")
]