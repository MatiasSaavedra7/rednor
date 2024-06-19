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
        let inscripcion_name = req.files["inscripcion_afip"] ? req.files["inscripcion_afip"][0].filename : null;
        let condicion_name = req.files["condicion_afip"] ? req.files["condicion_afip"][0].filename : null;
        let formulario_name = req.files["formulario_005"] ? req.files["formulario_005"][0].filename : null;

        let data = {
          ...req.body,
          inscripcion_afip: inscripcion_name,
          condicion_afip: condicion_name,
          formulario_005: formulario_name,
        }
        let cliente = await clientesService.create(data);
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

  edit: async (req, res) => {
    try {
      const cliente = await clientesService.getOneByPK(req.params.id);
      const tipos = await tiposClientesService.getAll();
      res.render("clientes/editarCliente", { cliente, tipos });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let inscripcion_name = req.files["inscripcion_afip"] ? req.files["inscripcion_afip"][0].filename : null;
        let condicion_name = req.files["condicion_afip"] ? req.files["condicion_afip"][0].filename : null;
        let formulario_name = req.files["formulario_005"] ? req.files["formulario_005"][0].filename : null;

        let data = {
          ...req.body,
          inscripcion_afip: inscripcion_name,
          condicion_afip: condicion_name,
          formulario_005: formulario_name,
        }
        let cliente = await clientesService.updateByPK(data, req.params.id);
        if (cliente) {
          res.redirect(`/clientes/detalle/${req.params.id}`)
        }
      } else {
        const cliente = await clientesService.getOneByPK(req.params.id);
        const tipos = await tiposClientesService.getAll();
        res.render("clientes/editarCliente", {
          errors: errors.mapped(),
          old: req.body,
          cliente,
          tipos
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
