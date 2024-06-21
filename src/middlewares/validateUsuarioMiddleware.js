const { check } = require("express-validator");

module.exports = [
  check("nombre")
    .notEmpty()
    .withMessage("Debes ingresa tu nombre"),
  check("apellido")
    .notEmpty()
    .withMessage("Debes ingresar tu apellido"),
  check("usuario")
    .notEmpty()
    .withMessage("Debes ingresar un nombre de usuario, con el cual vas a iniciar sesion"),
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
