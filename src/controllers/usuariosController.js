require("dotenv").config();

const usuariosService = require("../database/services/usuariosService");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");

const SECRET_KEY = process.env.SECRET_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = {
  mostrarRegistro: (req, res) => {
    try {
      res.render("usuarios/registroUsuario");
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  },

  registrarUsuario: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("usuarios/registroUsuario", {
          errors: errors.mapped(),
          old: req.body,
        });
      }

      //  Elimino el campo rePassword del formulario
      delete req.body.rePassword;

      //  Encriptar la contraseña
      const password = await bcryptjs.hash(req.body.password, 10);

      //  Crear un objeto data con toda la informacion del nuevo usuario  
      const data = {
        ...req.body,
        password,
        id_rol: 4,
        verified: false,
      };

      //  Almaceno el nuevo usuario en la base de datos
      const newUser = await usuariosService.create(data);

      //  Token
      const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: "1h"});

      let transporter = nodemailer.createTransport({
        host: "vps-2689092-x.dattaweb.com",
        port: 465,
        secure: true, // true para puerto 465, false para otros puertos
        auth: {
          user: process.env.EMAIL_USER, // tu usuario
          pass: process.env.EMAIL_PASS, // tu contraseña
        },
      });

      let mailOptions = {
        from: EMAIL_USER,
        to: newUser.email,
        subject: "Verificacion de cuenta",
        text: `Haz clic en el siguiente enlace para verificar tu cuenta: http://179.43.127.183:3000/usuarios/verificar/${token}`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error al enviar el correo");
        }
        res.send("Correo de verificacion enviado");
      })

      
    } catch (error) {
      console.log(error);
    }
  },

  verificarUsuario: async (req, res) => {
    try {
      //  Capturo el token de los params
      const token = req.params.token;

      //  Verifico el token con el secret key
      const decoded = jwt.verify(token, SECRET_KEY);

      //  Actualizo el campo 'verified' de la tabla 'usuarios' a true para indicar que la cuenta esta verificada
      await usuariosService.updateByPK(decoded.id, { verified: true });

      //  Envio un mensaje para confirmar que la cuenta ha sido verificada
      res.send("Cuenta verificada");
    } catch (error) {
      console.log(error);
    }
  },

  mostrarLogin: (req, res) => {
    try {
      res.render("usuarios/loginUsuario");
    } catch (error) {
      console.log(error);
    }
  },

  logUsuario: async (req, res) => {
    try {
      const { email, password } = req.body;

      const usuario = await usuariosService.getOneByEmail(email);

      //  Si el usuario existe
      if (usuario) {
        const checkPassword = await bcryptjs.compare(password, usuario.password);
        if (checkPassword && usuario.verified) {
          // Elimino la contraseña por motivos seguridad
          usuario.password = null;
          delete usuario.password;

          // Guardo la informacion del usuario en session
          req.session.userLogged = usuario;

          // Redireccionar al usuario a la pagina de inicio
          return res.redirect("/");
        } else if (!usuario.verified) {
          return res.status(401).render("usuarios/loginUsuario", {
            errors: { login: { msg: "Cuenta no verificada. Por favor, verifica tu email." } },
            old: req.body,
          });
        } else {
          return res.status(401).render("usuarios/loginUsuario", {
            errors: { login: { msg: "Contraseña incorrecta" } },
            old: req.body,
          });
        }
      } else {
        return res.status(404).render("usuarios/loginUsuario", {
          errors: { email: { msg: "Correo no válido" } },
          old: req.body,
        });
      }

    } catch (error) {
     console.log(error);
    }
  },

  cerrarSesion: async (req, res) => {
    try {
      // Destruir la sesion del usuario
      req.session.destroy(); 
      // Limpiar las cookies
      res.clearCookie("rednorCookieSession");
      res.clearCookie("firma");
      // Redirigir al usuario a la pagina de login
      res.redirect("/usuarios/login") ;
    } catch (error) {
      console.log(error);
    }
  },
};
