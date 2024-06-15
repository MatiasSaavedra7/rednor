const clientesService = require("../database/services/clientesService");
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
};
