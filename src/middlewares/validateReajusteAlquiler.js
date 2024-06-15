const { check } = require("express-validator");

module.exports = [
  check("minimo_copias")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),
  check("precio_copias")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),
]