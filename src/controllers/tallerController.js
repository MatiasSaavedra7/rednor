const ingresosService = require("../database/services/ingresosService");
const equiposService = require("../database/services/equiposService");
const egresosService = require("../database/services/egresosService");
const informesService = require("../database/services/informesService");
const { Logger } = require("sequelize/lib/utils/logger");

module.exports = {
  taller: async (req, res) => {
    try {
      let equipos = await equiposService.getAllTaller();
      let ingresos = await ingresosService.getAll();
      res.render("taller/taller", { equipos, ingresos });
    } catch (error) {
      console.log(error);
    }
  },

  detalle: async (req, res) => {
    try {
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      let egreso = await egresosService.getOneByIdIngreso(ingreso.id);
      let informes = await informesService.getAllByIdIngreso(ingreso.id);
      console.log(informes);
      
      res.render("taller/detalleTaller", { ingreso, egreso, informes });
    } catch (error) {
      console.log(error);
    }
  },

  ingreso: async (req, res) => {
    try {
      let equipo = await equiposService.getOneByPK(req.params.id);
      res.render("taller/ingreso", { equipo });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarIngreso: async (req, res) => {
    try {
      let data = {
        ...req.body,
        id_equipo: req.params.id,
        id_estado: 1,
        fecha_ingreso: new Date(),
      };

      let ingreso = await ingresosService.create(data);

      if (ingreso) {
        await equiposService.setEstadoTaller(ingreso.id_equipo);
        res.redirect(`/taller/detalle/${ingreso.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  egreso: async (req, res) => {
    try {
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      let equipo = await equiposService.getOneByPK(ingreso.id_equipo);
      res.render("taller/egreso", { ingreso, equipo });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarEgreso: async (req, res) => {
    try {
      let idIngreso = req.params.id;

      let data = {
        id_ingreso: idIngreso,
        fecha_egreso: new Date(),
        ...req.body,
      };

      let egreso = await egresosService.create(data);

      if (egreso) {
        let ingreso = await ingresosService.getOneByPK(req.params.id);
        let equipo = await equiposService.getOneByPK(ingreso.id_equipo);
        await equiposService.setEstadoDisponible(equipo.id);
        res.redirect(`/taller/detalle/${egreso.id_ingreso}`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  informe: async (req, res) => {
    try {
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      res.render("taller/informe", { ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarInforme: async (req, res) => {
    try {
      let data = {
        ...req.body,
        id_ingreso: req.params.id,
        fecha: new Date(),
      };

      await informesService.create(data);

      res.redirect(`/taller/detalle/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
