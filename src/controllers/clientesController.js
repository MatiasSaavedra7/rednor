const clientesService = require("../database/services/clientesService");
const tiposService = require("../database/services/tiposService");
const contactoService = require("../database/services/contactoService");

const { validationResult } = require("express-validator");

module.exports = {
  clientes: async (req, res) => {
    try {
      const clientes = await clientesService.getAll();
      res.render("clientes/clientes", { clientes });
    } catch (error) {
      console.log(error);
    }
  },

  detalleCliente: async (req, res) => {
    try {
      const cliente = await clientesService.getOneByPK(req.params.id);
      res.render("clientes/detalleCliente", { cliente });
    } catch (error) {
      res.send(error);
    }
  },

  create: async (req, res) => {
    try {
      const tipos = await tiposService.getAll();
      res.render("clientes/registerFormCliente", { tipos });
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let contacto = await contactoService.create(req.body);
        let cliente = await clientesService.create(req.body, contacto.id)

        if(cliente){
          res.redirect(`/clientes/detalle/${cliente.id}`);
        }
      } else {
        let tipos = await tiposService.getAll();
        res.render("clientes/registerFormCliente", {
          errors: errors.mapped(),
          old: req.body,
          tipos
        })
      }
    } catch (error) {
      console.log(error);
    }
  },

  edit: (req, res) => {
    res.send("FORMULARIO PARA EDITAR LA INFORMACION DE UN CLIENTE");
  },

  update: (req, res) => {
    res.send("ALMACENAR INFORMACION ACTUALIZADA DEL CLIENTE");
  },
};
