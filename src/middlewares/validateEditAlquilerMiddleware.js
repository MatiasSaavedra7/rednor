const { check } = require("express-validator");

module.exports = [
  // check("minimo_copias")
  //   .notEmpty()
  //   .withMessage("Ingresa la cantidad minima de copias"),
  // check("precio_copias")
  //   .notEmpty()
  //   .withMessage("Ingresa el precio por cada copia"),
  check("precio")
    .notEmpty()
    .withMessage("Ingresa el precio total"),
  check("firma")
    .notEmpty()
    .withMessage("Debes seleccionar una firma"),
  // check("numero_facturacion")
  //   .notEmpty()
  //   .withMessage("Ingresa el numero de facturacion"),
  // check("departamento")
  //   .notEmpty()
  //   .withMessage("Debes ingresar el departamento de la operacion")
]