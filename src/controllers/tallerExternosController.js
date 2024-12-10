const marcasService = require("../database/services/marcasService");
const tiposService = require("../database/services/tiposEquiposService");
const equiposExternosService = require("../database/services/equiposExternosService");
const ingresosExternosService = require("../database/services/ingresosExternosService");
const egresosExternosService = require("../database/services/egresoExternoService");
const informesExternosService = require("../database/services/informesExternosService");
const insumosExternosService = require('../database/services/insumosExternosService');
const formasPagoService = require("../database/services/formasPagoService");

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
          res.redirect(
            `/taller/externos/ingresos?equipo-externo=${equipoExterno.id}`
          );
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
      let ingresosEnTaller = ingresos.filter(
        (ingreso) =>
          ingreso.id_estado === 1 ||
          ingreso.id_estado === 2 ||
          ingreso.id_estado === 3
      );
      // let ingresosEnEspera = ingresos.filter(ingreso => ingreso.id_estado === 2);
      let ingresosHistorial = ingresos.filter(
        (ingreso) => ingreso.id_estado === 4 || ingreso.id_estado == 6
      );

      res.render("taller/externos/tallerExterno", {
        ingresos,
        ingresosEnTaller,
        /* ingresosEnEspera,*/ ingresosHistorial,
      });
    } catch (error) {
      console.log(error);
    }
  },

  detalle: async (req, res) => {
    try {
      let ingreso = await ingresosExternosService.getOneByPK(req.params.id);
      let egreso = await egresosExternosService.getOneByIdIngreso(ingreso.id);
      let informes = await informesExternosService.getAllByIdIngreso(ingreso.id);
      let insumos = await insumosExternosService.getAllByIdIngreso(ingreso.id);
      let formasPago = await formasPagoService.getAll();

      // Combinacion de informes e insumos en un solo array
      const combinedData = [
        ...informes.map(informe => ({
          type: 'informe',
          fecha: informe.fecha_informe,
          detalle: informe.detalle,
          pedido_insumos: informe.pedido_insumos,
          id: informe.id
        })),
        ...insumos.map(insumo => ({
          type: 'insumo',
          fecha: insumo.fecha_entrega,
          observacion: insumo.observacion,
          nro_remito: insumo.nro_remito,
          id: insumo.id,
        }))
      ];
      
      // Ordenar los datos por fecha (de más antiguo a más reciente)
      combinedData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      res.render("taller/externos/detalleTallerExterno", {
        ingreso,
        egreso,
        informes,
        insumos,
        formasPago,
        combinedData,
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
        id_forma_pago: null,
        id_ingreso_externo: ingreso.id,
        fecha_egreso: new Date(),
      };

      // Almaceno en la base de datos.
      await egresosExternosService.create(data);

      // Analizo si el estado del equipo
      if (req.body.estado == "Listo para retirar") {
        // Actualizo el estado del equipo a 'Listo para retirar'.
        await ingresosExternosService.updateByPK(ingreso.id, { id_estado: 3 });
      } else {
        // Actualizo el estado del equipo a 'Sin arreglo'
        await ingresosExternosService.updateByPK(ingreso.id, { id_estado: 6 });
      }

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
        pedido_insumos: req.body.pedido_insumos ? true : false,
        fecha_informe: new Date(),
      };

      // Creo el registro del informe en la base de datos
      await informesExternosService.create(data);

      // Analizo si se hizo un pedido de insumos
      if (req.body.pedido_insumos) {
        // Si es verdadero, entonces actualizo el estado del ingreso a 'En espera de insumos'
        await ingresosExternosService.updateByPK(req.params.id, { id_estado: 2 });
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

  definirPrecio: async (req, res) => {
    try {
      // Traigo la informacion del egreso desde la base de datos
      let egreso = await egresosExternosService.getOneByPK(req.params.idEgreso);

      const { precio } = req.body;

      // Actualizo el precio del egreso
      await egresosExternosService.updateByPK(egreso.id, { precio });

      // Redirecciono al usuario a la lista de ingresos
      res.redirect(`/taller/externos/detalle/${egreso.id_ingreso_externo}`);
    } catch (error) {
      console.log("\n\n [ERROR] : Error al definir el precio del arreglo." + error);
    }
  },

  informarCobro: async (req, res) => {
    try {
      // Traigo la informacion del egreso desde la base de datos
      let egreso = await egresosExternosService.getOneByPK(req.params.idEgreso);

      // Creo un objeto data con la informacion a actualizar
      let data = {
        id_forma_pago: req.body.id_forma_pago,
        precio: req.body.precio,
        fecha_cobro: new Date(),
      }

      // Actualizo los nuevos datos
      await egresosExternosService.updateByPK(egreso.id, data)

      // Actualizo el estado del ingreso a 'Cobrado'
      await ingresosExternosService.updateByPK(egreso.id_ingreso_externo, { id_estado: 4 });

      // Redirecciono al usuario a la lista de ingresos
      res.redirect("/taller/externos");
    } catch (error) {
      console.log(error);
    }
  },

  insumos: async (req, res) => {
    try {
      let informe = await informesExternosService.getOneByPK(req.params.idInforme);
      let ingreso = await ingresosExternosService.getOneByPK(informe.id_ingreso_externo);
      res.render("taller/externos/insumosExternos", { informe, ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarInsumos: async (req, res) => {
    try {
      let informe = await informesExternosService.getOneByPK(req.params.idInforme);
      // console.log(informe);
      // let ingreso = await ingresosExternosService.getOneByPK(informe.id_ingreso_externo);

      // Creo un objeto 'data' con la informacion para almacenar en los informes de insumos
      let data = {
        ...req.body,
        id_informe_externo: informe.id,
        id_ingreso_externo: informe.id_ingreso_externo,
        fecha_entrega: new Date(),
      };

      // Almaceno en la base de datos los insumos
      await insumosExternosService.create(data);

      // Actualizo el estado del ingreso a 'En Taller'
      await ingresosExternosService.updateByPK(informe.id_ingreso_externo, { id_estado: 1 });

      // Actualizo el valor de pedido_insumos de la tabla ingresos a false
      await informesExternosService.updateByPK(informe.id, { pedido_insumos: false });

      // Redirecciono al usuario al detalle del ingresos
      res.redirect(`/taller/externos/detalle/${informe.id_ingreso_externo}`);
    } catch (error) {
      console.log(error);
    }
  },
};
