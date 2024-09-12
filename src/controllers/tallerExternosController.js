const marcasService = require("../database/services/marcasService");
const tiposService = require('../database/services/tiposEquiposService');
const equiposExternosService = require('../database/services/equiposExternosService');
const ingresosExternosService = require("../database/services/ingresosExternosService");
const egresosExternosService = require("../database/services/egresoExternoService");
const informesExternosService = require("../database/services/informesExternosService");

const { validationResult } = require("express-validator");

module.exports = {
  crearEquipo: async (req, res) => {
    try {
      let marcas = await marcasService.getAll();
      let tipos = await tiposService.getAll();
      res.render("taller/externos/registroEquipoExterno", { marcas, tipos });
    } catch (error) {
      console.log(error);
    }
  },

  guardarEquipo: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let equipoExterno = await equiposExternosService.create(req.body);
        //  Este bloque de codigo redirecciona directamente a la pagina de detalle del cliente recien creado
        if (equipoExterno) {
          res.redirect(`/taller/externos/ingresos?equipo-externo=${equipoExterno.id}`);
        }
      } else {
        let marcas = await marcasService.getAll();
        let tipos = await tiposEquiposService.getAll();
        res.render("/taller/externos/registroEquipoExterno", {
          marcas,
          tipos,
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  taller: async (req, res) => {
    try {
      let ingresos = await ingresosExternosService.getAll();

      // Filtrar los ingresos según el estado
      let ingresosEnTaller = ingresos.filter(ingreso => ingreso.id_estado === 1 || ingreso.id_estado === 3);
      let ingresosEnEspera = ingresos.filter(ingreso => ingreso.id_estado === 2);
      let ingresosCobrados = ingresos.filter(ingreso => ingreso.id_estado === 4);
      
      res.render("taller/externos/tallerExterno", { ingresos, ingresosEnTaller, ingresosEnEspera, ingresosCobrados});
    } catch (error) {
      console.log(error);
    }
  },

  detalle: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      let egreso = await egresosExternosService.getOneByIdIngreso(ingreso.id);
      let informes = await informesExternosService.getAllByIdIngreso(ingreso.id);
      res.render("taller/externos/detalleTallerExterno", {
        ingreso,
        egreso,
        informes,
      });
    } catch (error) {
      console.log(error);
    }
  },

  ingreso: async (req, res) => {
    try {
      let equipos = await equiposExternosService.getAll();
      let marcas = await marcasService.getAll();
      res.render("taller/externos/ingresoExterno", { marcas, equipos });
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

      console.log(data);

      let ingresoExterno = await ingresosExternosService.create(data);

      res.redirect(`/taller/externos/detalle/${ingresoExterno.id}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  egreso: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      res.render("taller/externos/egresoExterno", { ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarEgreso: async (req, res) => {
    try {
      // Traigo desde la base de datos la informacion del ingreso.
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);

      // Creo el objeto con la informacion para guardar en el registro de egresos.
      let data = {
        ...req.body,
        id_ingreso_externo: ingreso.id,
        fecha_egreso: new Date(),
      };

      // Almaceno en la base de datos.
      await egresosExternosService.create(data);

      // Actualizo el estado del equipo a 'Listo para retirar'.
      await ingresosExternosService.updateByPK(ingreso.id, { id_estado: 3 });

      // Redirecciono al usuario a la pagina de detalle del ingreso.
      res.redirect(`/taller/externos/detalle/${ingreso.id}`);
    } catch (error) {
      console.log(error);
    }
  },

  informe: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      res.render("taller/externos/informeExterno", { ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarInforme: async (req, res) => {
    try {
      // Creo el objeto con la informacion del informe
      let data = {
        ...req.body,
        id_ingreso_externo: req.params.id,
        fecha_informe: new Date(),
      };

      // Creo el registro del informe en la base de datos
      await informesExternosService.create(data);

      // Analizo si se hizo un pedido de insumos
      if (req.body.pedidoInsumos) {
        // Si es verdadero, entonces actualizo el estado del ingreso a 'En espera de insumos'
        await ingresosExternosService.updateByPK(req.params.id, {
          id_estado: 2,
        });
      }

      res.redirect(`/taller/externos/detalle/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },

  editarIngreso: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      let marcas = await marcasService.getAll();
      res.render("taller/externos/editarIngresoExterno", { ingreso, marcas });
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
      let ingreso = await ingresosExternosService.getOneByPK(
        informe.id_ingreso_externo
      );
      res.render("taller/externos/editarInformeExterno", { informe, ingreso });
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
  },

  informarCobro: async (req, res) => {
    try {
      // Capturo el id del ingreso
      let id = req.params.idIngreso;

      // Actualizo el estado del ingreso a 'Cobrado'
      await ingresosExternosService.updateByPK(id, { id_estado: 4 });

      // Redirecciono al usuario a la lista de ingresos
      res.redirect("/taller/externos");
    } catch (error) {
      console.log(error);
    }
  },
};
