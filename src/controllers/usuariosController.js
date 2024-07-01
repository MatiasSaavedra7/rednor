const usuariosService = require("../database/services/usuariosService");
const bcryptjs = require("bcryptjs");

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

  registro: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        // Elimino del objeto body el atributo rePassword (solo sirve como verificacion de contraseña)
        delete req.body.rePassword;

        // A través de bcryptjs hasheo la password
        let password = bcryptjs.hashSync(req.body.password, 10);

        // Creo un objeto data con los valores a almacenar en la base de datos
        let data = {
          ...req.body,
          password,
          id_rol: 4,
        };
        await usuariosService.create(data);
        res.redirect("/admin/usuarios");
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

  login: async (req, res) => {
    try {
      let usuario = await usuariosService.getOneByUser(req.body.usuario);

      // Verifico si el usuario existe
      if (usuario) {
        // Comparo las contraseñas
        let checkPassword = bcryptjs.compareSync(
          req.body.password,
          usuario.password
        );

        // Si la contraseña es correcta, logueo al usuario
        if (checkPassword) {
          // Guardo al usuario en session
          req.session.userLogged = usuario;

          // Redirijo a la home
          return res.redirect("/");
        } else {
          res.send("El usuario EXISTE y la contraseña es INCORRECTA!!!");
        }
      } else {
        res.send("El usuario NO EXISTE");
      }
    } catch (error) {
      console.log(error);
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.clearCookie("rednorCookieSession");
      res.redirect("/usuarios/login") ;
    } catch (error) {
      console.log(error);
    }
  },
};
