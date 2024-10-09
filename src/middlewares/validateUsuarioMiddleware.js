const { check } = require("express-validator");
const usuariosService = require("../database/services/usuariosService");

module.exports = [
  check("nombre")
    .notEmpty()
    .withMessage("Debes ingresa tu nombre"),
  check("apellido")
    .notEmpty()
    .withMessage("Debes ingresar tu apellido"),
  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un correo")
    .isEmail()
    .withMessage("El correo ingresado no es válido")
    .custom(async (email) => {
      const usuario = await usuariosService.getOneByEmail(email);
      if (usuario) {
        throw new Error("El correo ingresado ya está en uso");
      }
    }),
  check('password')
    .notEmpty()
    .withMessage('Debes ingresar una contraseña').bail()
    .isLength({ min: 6})
    .withMessage('La contraseña debe tener un mínimo de 6 caracteres.'),
  check('rePassword')
    .notEmpty().withMessage('Debes completar este campo').bail()
    .custom((value, { req }) => {
        let { rePassword, password } = req.body;

        if (rePassword !== password) {
          throw new Error("Las contraseñas no coinciden")
        }

        return true;
    })
];
