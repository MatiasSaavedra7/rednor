const clientesService = require("../database/services/clientesService");
const tiposClientesService = require("../database/services/tiposClientesService");
const alquileresService = require("../database/services/alquileresService");

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
      const alquileres = await alquileresService.getByIdCliente(req.params.id);
      res.render("clientes/detalleCliente", { cliente, alquileres });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const tipos = await tiposClientesService.getAll();
      res.render("clientes/registroCliente", { tipos });
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let cliente = await clientesService.create(req.body);
        if (cliente) {
          res.redirect(`/clientes/detalle/${cliente.id}`);
        }
      } else {
        let tipos = await tiposClientesService.getAll();
        res.render("clientes/registroCliente", {
          errors: errors.mapped(),
          old: req.body,
          tipos,
        });
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
