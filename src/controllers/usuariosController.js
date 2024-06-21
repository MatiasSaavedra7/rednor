const { validationResult } = require("express-validator");

module.exports = {
  formRegistro: (req, res) => {
    try {
      res.render("usuarios/registroUsuario");
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  },

  registro: (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        res.send("Usuario registrado con éxito!");
      } else {
        res.render("usuarios/registroUsuario", {
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  },

  formLogin: (req, res) => {
    try {
      res.render("usuarios/loginUsuario");
    } catch (error) {
      console.log(error);
    }
  },

  login: (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        res.send("El usuario ha iniciado sesion con éxito!");
      } else {
        res.render("usuarios/loginUsuario", {
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
