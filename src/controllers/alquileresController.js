const alquileresService = require("../database/services/alquileresService");
const clientesService = require("../database/services/clientesService");
const equiposService = require("../database/services/equiposService");
const firmasService = require("../database/services/firmasService");
const marcasService = require("../database/services/marcasService");

const { validationResult } = require("express-validator");

module.exports = {
  alquileres: async (req, res) => {
    try {
      let alquileres = await alquileresService.getAll();
      let marcas = await marcasService.getAll();
      res.render("alquileres/alquileres", { alquileres, marcas });
    } catch (error) {
      console.log(error);
    }
  },

  detalleAlquiler: async (req, res) => {
    try {
      let alquiler = await alquileresService.getOneByPK(req.params.id);
      let cliente = await clientesService.getOneByPK(alquiler.cliente.id);
      let equipo = await equiposService.getOneByPK(alquiler.equipo.id);
      res.render("alquileres/detalleAlquiler", { alquiler, cliente, equipo });
    } catch (error) {
      console.log(error);
    }
  },
  // FORMULARIO PARA REGISTRAR UN NUEVO ALQUILER
  create: async (req, res) => {
    try {
      let cliente = await clientesService.getOneByPK(req.query.cliente);
      let equipos = await equiposService.getAllDisponibles();
      let firmas = await firmasService.getAll();
      res.render("alquileres/registroAlquiler", {
        cliente,
        equipos,
        firmas,
      });
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let id = req.query.cliente;
        let fechaBaja = req.body.fecha_baja ? req.body.fecha_baja : null;
        let data = {
          ...req.body,
          id_cliente: id,
          fecha_baja: fechaBaja,
        };
        let alquiler = await alquileresService.create(data);
        if (alquiler) {
          await equiposService.setEstadoAlquilado(alquiler.id_equipo);
          res.redirect(`/alquileres/detalles/${alquiler.id}`);
        }
      } else {
        let cliente = await clientesService.getOneByPK(req.query.cliente);
        let equipos = await equiposService.getAllDisponibles();
        let firmas = await firmasService.getAll();
        res.render("alquileres/registroAlquiler", {
          errors: errors.mapped(),
          old: req.body,
          cliente,
          equipos,
          firmas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  finalizarContrato: async (req, res) => {
    try {
      // Capturo el ID del contrato que viene por parametro.
      let alquiler = await alquileresService.getOneByPK(req.params.id);
      // Envio un objeto con la siguiente informacion, fecha_baja para informar la fecha en la que finalizo el contrato y 'activo: false' para poder agrupar los contratos finalizados.
      let data = {
        activo: false,
        fecha_baja: new Date(),
      };
      await alquileresService.updateByPK(data, alquiler.id);
      // Actualizo el estado del equipo a Disponible.
      await equiposService.setEstadoDisponible(alquiler.equipo.id);
      // Redirigir al usuario a la pagina de alquileres
      res.redirect("/alquileres");
    } catch (error) {
      console.log(error);
    }
  },
};
