const ingresosService = require("../database/services/ingresosService");
const equiposService = require("../database/services/equiposService");
const egresosService = require("../database/services/egresosService");

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
      let egreso = await egresosService.getOneByIdIngreso(ingreso.id)
      res.render("taller/detalleTaller", { ingreso, egreso });
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
};
