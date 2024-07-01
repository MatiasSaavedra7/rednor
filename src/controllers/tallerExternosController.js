const marcasService = require("../database/services/marcasService");
const ingresosExternosService = require("../database/services/ingresosExternosService");
const egresosExternosService = require("../database/services/egresoExternoService");
const egresoExternoService = require("../database/services/egresoExternoService");
module.exports = {
  taller: async (req, res) => {
    try {
      let ingresos = await ingresosExternosService.getAll();
      res.render("taller/tallerExternos", { ingresos });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  detalle: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      let egreso = await egresosExternosService.getOneByIdIngreso(ingreso.id);
      res.render("taller/detalleTallerExterno", { ingreso, egreso });
    } catch (error) {
      console.log(error);
    }
  },

  ingreso: async (req, res) => {
    try {
      let marcas = await marcasService.getAll();
      res.render("taller/ingresoExternos", { marcas });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarIngreso: async (req, res) => {
    try {
      let data = {
        ...req.body,
        fecha_ingreso: new Date(),
      };

      await ingresosExternosService.create(data);

      res.redirect("/taller/externos");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  egreso: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      res.render("taller/egresoExternos", { ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarEgreso: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);

      let data = {
        ...req.body,
        id_ingreso_externo: ingreso.id,
        fecha_egreso: new Date(),
      };

      await egresoExternoService.create(data);

      res.redirect(`/taller/externos/detalle/${ingreso.id}`);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
