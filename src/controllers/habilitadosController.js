const clientesService = require("../database/services/clientesService");
const habilitadosService = require("../database/services/habilitadosService");
const personasHabilitadasService = require("../database/services/habilitadosService");

const { validationResult } = require("express-validator");

module.exports = {
  // FORMULARIO PARA REGISTRAR UN HABILITADO AL CLIENTE
  create: async (req, res) => {
    try {
      let cliente = await clientesService.getOneByPK(req.query.cliente);
      res.render("habilitados/registroHabilitados", { cliente });
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        // Capturo el ID del cliente que viene por query params
        let id = req.query.cliente;
        let data = {
          ...req.body,
          id_cliente: id,
        };
        let habilitado = await personasHabilitadasService.create(data);
        if (habilitado) {
          res.redirect(`/clientes/detalle/${habilitado.id_cliente}`);
        }
      } else {
        let cliente = await clientesService.getOneByPK(req.query.cliente);
        res.render("habilitados/registroHabilitados", {
          errors: errors.mapped(),
          old: req.body,
          cliente,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    try {
      const habilitado = await habilitadosService.getOneByPK(req.params.id);
      res.render("habilitados/editarHabilitado", { habilitado });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        await habilitadosService.updateByPK(req.params.id, req.body);
        res.redirect(`/clientes/detalle/${req.body.id_cliente}`);
      } else {
        let habilitado = await habilitadosService.getOneByPK(req.params.id);
        res.render("habilitados/editarHabilitado", {
          errors: errors.mapped(),
          old: req.body,
          habilitado,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const habilitado = await habilitadosService.getOneByPK(req.params.id);
      const idCliente = habilitado.id_cliente;
      await habilitadosService.deleteByPK(req.params.id);
      res.redirect(`/clientes/detalle/${idCliente}`);
    } catch (error) {
      console.log(error);
    }
  }
};
