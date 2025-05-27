const { check } = require("express-validator");

module.exports = [
  check("nombre")
    .notEmpty()
    .withMessage("Debes ingresar un nombre"),
  // check("razon_social")
  //   .notEmpty()
  //   .withMessage("Debes ingresar una razon social"),
  // check("domicilio_comercial")
  //   .notEmpty()
  //   .withMessage("Debes ingresar el domicilio comercial"),
  // check("id_tipo_cliente")
  //   .notEmpty()
  //   .withMessage("Selecciona una opcion"),
  // check("email")
  //   .notEmpty()
  //   .withMessage("Debes ingresar un correo")
  //   .bail()
  //   .isEmail()
  //   .withMessage("Ingresa un formato de correo válido"),
  // check("telefono")
  //   .notEmpty()
  //   .withMessage("Debes ingresar un número de teléfono"),
  // check("ciudad")
  //   .notEmpty()
  //   .withMessage("Debes ingresar la ciudad del cliente"),
  // check("direccion")
  //   .notEmpty()
  //   .withMessage("Debes ingresar la direccion del cliente"),
  // check("cuit")
  //   .notEmpty()
  //   .withMessage("Debes ingresar el CUIT del cliente")
  //   .isLength({ min: 13, max: 13})
  //   .withMessage("Formato de CUIT inválido")
];
