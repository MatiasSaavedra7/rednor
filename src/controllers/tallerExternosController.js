const marcasService = require("../database/services/marcasService");
const ingresosExternosService = require("../database/services/ingresosExternosService");
const egresosExternosService = require("../database/services/egresoExternoService");
const informesExternosService = require("../database/services/informesExternosService");

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
      let informes = await informesExternosService.getAllByIdIngreso(ingreso.id);
      res.render("taller/detalleTallerExterno", { ingreso, egreso, informes });
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
        id_estado: 1,
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

      await egresosExternosService.create(data);

      res.redirect(`/taller/externos/detalle/${ingreso.id}`);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  informe: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      res.render("taller/informeExterno", { ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarInforme: async (req, res) => {
    try {
      let data = {
        ...req.body,
        id_ingreso_externo: req.params.id,
        fecha: new Date(),
      };

      await informesExternosService.create(data);

      res.redirect(`/taller/externos/detalle/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },

  editarIngreso: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      let marcas = await marcasService.getAll();
      res.render("taller/editarIngresoExterno", { ingreso, marcas });
    } catch (error) {
      console.log(error);
    }
  },

  actualizarIngreso: async (req, res) => {
    try {
      let data = {
        ...req.body,
        fecha_ingreso: new Date(),
      };

      await ingresosExternosService.updateByPK(req.params.id, data);

      res.redirect(`/taller/externos/detalle/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },

  editarInforme: async (req, res) => {
    try {
      let informe = await informesExternosService.getOneByPK(req.params.id);
      let ingreso = await ingresosExternosService.getOneByPK(informe.id_ingreso_externo);
      res.render("taller/editarInformeExterno", { informe, ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  actualizarInforme: async (req, res) => {
    try {
      let informe = await informesExternosService.getOneByPK(req.params.id);

      let data = {
        ...req.body,
        id_ingreso_externo: informe.id_ingreso_externo,
      };
      
      await informesExternosService.updateByPK(req.params.id, data);

      res.redirect(`/taller/externos/detalle/${informe.id_ingreso_externo}`);
    } catch (error) {
      console.log(error);
    }
  }
};
