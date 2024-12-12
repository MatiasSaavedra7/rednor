const equiposExternosService = require("../database/services/equiposExternosService");
const marcasService = require("../database/services/marcasService");
const tiposEquiposService = require("../database/services/tiposEquiposService");

const { validationResult } = require("express-validator");

module.exports = {
  // Mostrar todos los equipos
  getAll: async (req, res) => {
    try {
      const equiposExternos = await equiposExternosService.getAll();
      // res.status(200).json(equiposExternos);
      res.render("equipos_externos/equiposExternos", { equiposExternos });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOneByPK: async (req, res) => {
    try {
      const equipoExterno = await equiposExternosService.getOneByPK(req.params.id);
      // res.status(200).json(equipoExterno);
      res.render("equipos_externos/detalleEquipoExterno", { equipoExterno });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const marcas = await marcasService.getAll();
      const tiposEquipos = await tiposEquiposService.getAll();
      
      res.render("equipos_externos/registroEquipoExterno", { marcas, tiposEquipos });
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo obtener las marcas y tipos de equipos: ${error}\n\n`;
      console.error(consoleMessage);
      res.status(500).json({ message: error.message });
    }
  },

  store: async (req, res) => {
    try {
      const { marca, modelo, numero_serie, id_tipo_equipo } = req.body;

      const data = {
        marca,
        modelo,
        numero_serie,
        id_tipo_equipo,
      };

      const equipoExterno = await equiposExternosService.create(data);

      if (!equipoExterno) {
        res.send("Ocurrió un error al intentar crear el equipo externo");
      }

      res.redirect(`/equipos-externos/${equipoExterno.id}/detalle`);
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo crear el equipo externo: ${error}\n\n`;
      console.error(consoleMessage);
      res.status(500).json({ message: error.message });
    }
  },

  edit: async (req, res) => {
    try {
      let equipoExterno = await equiposExternosService.getOneByPK(req.params.id);
      let marcas = await marcasService.getAll();
      let tipos = await tiposEquiposService.getAll();

      res.render("equipos_externos/editarEquipoExterno", { equipoExterno, marcas, tipos });
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo obtener el equipo externo a editar: ${error}\n\n`;
      console.error(consoleMessage);
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (!(errors.isEmpty())) {
        let equipoExterno = await equiposExternosService.getOneByPK(req.params.id);
        let marcas = await marcasService.getAll();
        let tipos = await tiposEquiposService.getAll();

        return res.render("equipos_externos/editarEquipoExterno", {
          errors: errors.mapped(),
          old: req.body,
          equipoExterno,
          marcas,
          tipos,
        });
      }

      const { marca, modelo, numero_serie, id_tipo_equipo } = req.body;

      const data = {
        marca,
        modelo,
        numero_serie,
        id_tipo_equipo,
      };

      await equiposExternosService.updateByPK(req.params.id, data);

      return res.redirect(`/equipos-externos/${req.params.id}/detalle`);
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo actualizar el equipo externo: ${error}\n\n`;
      console.log(consoleMessage);
      // res.status(500).json({ message: error.message });
      res.send(error);
    }
  }
}