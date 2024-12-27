const equiposExternosService = require("../database/services/equiposExternosService");
const marcasService = require("../database/services/marcasService");
const tiposEquiposService = require("../database/services/tiposEquiposService");

// Informes del Taller
const ingresosExternosService = require("../database/services/ingresosExternosService");
const egresosExternosService = require("../database/services/egresoExternoService");
const informesExternosService = require("../database/services/informesExternosService");
const insumosExternosService = require("../database/services/insumosExternosService");


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
      // console.log(equipoExterno);
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
  },

  getHistorialTaller: async (req, res) => {
    try {
      const ingreso = await ingresosExternosService.getAllByIdEquipo(req.params.idEquipo);
      
      if (!ingreso) {
        return res.json({ message: "No se encontraron datos del ingreso" });
      }

      res.json(ingreso);
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo obtener los datos del taller: ${error}\n\n`;
      console.log(consoleMessage);
    }
  },

  getDetalleHistorialTaller: async (req, res) => {
    try {
      const ingreso = await ingresosExternosService.getOneByPK(req.params.idIngreso);
      const egreso = await egresosExternosService.getOneByIdIngreso(req.params.idIngreso);
      const informes = await informesExternosService.getAllByIdIngreso(req.params.idIngreso);
      const insumos = await insumosExternosService.getAllByIdIngreso(req.params.idIngreso);

      //  Combinacion de Informes e Insumos en un solo array.
      const combinedData = [
        ...informes.map(informe => ({
          type: "informe",
          id: informe.id,
          fecha: informe.fecha_informe,
          detalle: informe.detalle,
          pedido_insumos: informe.pedido_insumos,
        })),

        ...insumos.map(insumo => ({
          type: "insumo",
          id: insumo.id,
          fecha: insumo.fecha_entrega,
          observacion: insumo.observacion,
          nro_remito: insumo.nro_remito,
        }))
      ];

      // Ordenar los datos por fecha (de más antiguo a más reciente)
      combinedData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      const data = {
        ingreso,
        egreso,
        // informes,
        // insumos,
        combinedData,
      }

      res.status(200).json(data);
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo obtener los datos del taller: ${error}\n\n`;
      console.log(consoleMessage);
    }
  }
}