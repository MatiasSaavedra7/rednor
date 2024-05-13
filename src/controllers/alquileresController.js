const alquileresService = require("../database/services/alquileresService");
const clientesService = require("../database/services/clientesService");
const equiposService = require("../database/services/equiposService");
const firmasService = require("../database/services/firmasService");

module.exports = {
  getAll: async (req, res) => {
    try {
      let alquileres = await alquileresService.getAll();
      res.render("alquileres/alquileres", { alquileres });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPk: async (req, res) => {
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
      let clientes = await clientesService.getAll();
      let equipos = await equiposService.getAll();
      let firmas = await firmasService.getAll();
      res.render("alquileres/registerFormAlquiler", {
        clientes,
        equipos,
        firmas,
      });
    } catch (error) {
      console.log();
      res.status(500);
    }
  },

  store: async (req, res) => {
    try {
      let alquiler = await alquileresService.create(req.body);
      if (alquiler) {
        res.redirect(`/alquileres/detalles/${alquiler.id}`);
      }
    } catch (error) {}
  },
};
