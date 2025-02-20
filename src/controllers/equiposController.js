const equiposService = require("../database/services/equiposService");
const marcasService = require("../database/services/marcasService");
const tiposEquiposService = require("../database/services/tiposEquiposService");
const alquileresService = require("../database/services/alquileresService");

// Taller
const ingresosService = require("../database/services/ingresosService");
const egresosService = require("../database/services/egresosService");
const informesService = require("../database/services/informesService");
const insumosService = require("../database/services/insumosService");

const { validationResult } = require("express-validator");

module.exports = {
  // METODO PARA LEER TODOS LOS EQUIPOS ALMACENADOS EN LA BASE DE DATOS
  equipos: async (req, res) => {
    try {
      let equipos = await equiposService.getAll();
      res.render("equipos/equipos", { equipos });
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA BUSCAR UN EQUIPO A TRAVES DE SU CLAVE PRIMARIA
  detalleEquipo: async (req, res) => {
    try {
      let equipo = await equiposService.getOneByPK(req.params.id);

      // Si el equipo esta alquilado, se busca el alquiler correspondiente
      let alquiler = await alquileresService.getByIdEquipo(equipo.id);

      // Si el equipo esta en el taller, se busca el ingreso correspondiente
      let taller = await ingresosService.getOneByIdEquipo(equipo.id);

      // Historial de ingresos del equipo
      let historial = await ingresosService.getAllByIdEquipo(equipo.id);
      
      res.render(`equipos/detalleEquipo`, { equipo, alquiler, taller, historial });
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA MOSTRAR EL FORMULARIO PARA REGISTRAR UN NUEVO EQUIPO
  create: async (req, res) => {
    try {
      let marcas = await marcasService.getAll();
      let tipos = await tiposEquiposService.getAll();
      res.render("equipos/registroEquipo", { marcas, tipos });
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA ALMACENAR UN NUEVO EQUIPO EN LA BASE DE DATOS
  store: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let data = {
          ...req.body,
          id_estado: 1,
        };
        let equipo = await equiposService.create(data);
        //  Este bloque de codigo redirecciona directamente a la pagina de detalle del cliente recien creado
        if (equipo) {
          res.redirect(`/equipos/detalle/${equipo.id}`);
        }
      } else {
        let marcas = await marcasService.getAll();
        let tipos = await tiposEquiposService.getAll();
        res.render("equipos/registroEquipo", {
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

  edit: async (req, res) => {
    try {
      let equipo = await equiposService.getOneByPK(req.params.id);
      let marcas = await marcasService.getAll();
      let tipos = await tiposEquiposService.getAll();
      res.render("equipos/editarEquipo", { equipo, marcas, tipos });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        await equiposService.updateByPK(req.body, req.params.id);
        res.redirect(`/equipos/detalle/${req.params.id}`);
      } else {
        let equipo = await equiposService.getOneByPK(req.params.id);
        let marcas = await marcasService.getAll();
        let tipos = await tiposEquiposService.getAll();
        res.render("equipos/editarEquipo", {
          errors: errors.mapped(),
          old: req.body,
          equipo,
          marcas,
          tipos,
        });
      }
    } catch (error) {
      res.status(500).send(error)
    }
  },

  delete: async (req, res) => {
    try {
      await equiposService.deleteByPK(req.params.id);
      res.redirect("/equipos")
    } catch (error) {
      console.log(error);
    }
  },

  getHistorialTaller: async (req, res) => {
    try {
      let ingresos = await ingresosService.getAllByIdEquipoAPI(req.params.id);

      if (!ingresos) {
        res.status(404).json({ message: "No se encontraron ingresos para el equipo" });
      }

      res.status(200).json(ingresos);
    } catch (error) {
      res.send(error);
    }
  },

  getDetalleHistorialTaller: async (req, res) => {
    try {
      const ingreso = await ingresosService.getOneByPKAPI(req.params.idIngreso);
      const egreso = await egresosService.getOneByIdIngresoAPI(req.params.idIngreso);
      const informes = await informesService.getAllByIdIngresoAPI(req.params.idIngreso);
      const insumos = await insumosService.getAllByIdIngresoAPI(req.params.idIngreso);

      // Combinacion de Informes e Insumos en un solo array
      const combinedData = [
        ...informes.map(informe => ({
          type: "informe",
          id: informe.id,
          fecha: informe.fecha_informe,
          detalle: informe.detalle,
          pedido_insumos: informe.pedido_insumos,
          id_usuario: informe.id_usuario || "Usuario",
          nombre_usuario: informe.usuario?.nombre || "Usuario",
        })),

        ...insumos.map(insumo => ({
          type: "insumo",
          id: insumo.id,
          fecha: insumo.fecha_entrega,
          observacion: insumo.observacion,
          nro_remito: insumo.nro_remito,
          id_usuario: insumo.id_usuario || "Usuario",
          nombre_usuario: insumo.usuario?.nombre || "Usuario",
        })),
      ];

      // Ordenar los datos por fecha (de más antiguo a más reciente)
      combinedData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      const data = {
        ingreso,
        egreso,
        combinedData,
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al buscar el ingreso" });
    }
  },
    
};
