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
const firmasService = require("../database/services/firmasService");

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
      // console.log("Alquiler: ", alquiler);

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
      let firmas = await firmasService.getAll();

      res.render("equipos/registroEquipo", { marcas, tipos, firmas });
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA ALMACENAR UN NUEVO EQUIPO EN LA BASE DE DATOS
  store: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        // Mostrar por consola
        console.log(req.body);

        // Capturar la informacion del body del formulario
        const { marca, nueva_marca, modelo, numero_serie, id_tipo_equipo, nuevo_tipo_equipo, id_firma } = req.body;

        // Objeto con informacion del nuevo equipo
        let data = {
          marca: marca,
          modelo: modelo,
          numero_serie: numero_serie,
          id_tipo_equipo: id_tipo_equipo,
          id_firma: id_firma,
          id_estado: 1,
        }

        // Si el usuario ingreso una nueva marca
        if (marca == "Otro" && nueva_marca !== "") {
          await marcasService.create({ nombre: nueva_marca });
          data.marca = nueva_marca;
        };

        // Si el usuario ingreso un nuevo tipo de equipo
        if (id_tipo_equipo == "Otro" && nuevo_tipo_equipo !== "") {
          await tiposEquiposService.create({ nombre: nuevo_tipo_equipo });
          const tipoEquipo = await tiposEquiposService.getByName(nuevo_tipo_equipo);
          data.id_tipo_equipo = tipoEquipo.id;
        };

        // Guardar el nuevo equipo en base de datos
        const equipo = await equiposService.create(data);

        // Redireccionar al usuario al detalle del cliente
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
      let firmas = await firmasService.getAll();

      res.render("equipos/editarEquipo", { equipo, marcas, tipos, firmas });
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

  // Metodo para traer equipos disponibles para ingreso al taller (id_estado: 1, 2, 3)
  equiposDisponibles: async (req, res) => {
    try {
      const equipos = await equiposService.getAllDisponibles();

      if (!equipos) {
        res.status(404).json({ message: "No se encontraron equipos disponibles" });
        
      }

      res.status(200).json(equipos);
    } catch (error) {
      res.status(500).json({ message: "Error al buscar los equipos disponibles" });
      console.log(error);
    }
  },

  getCantidadTotalEquipos: async function(req, res) {
    try {
      const disponibles = await equiposService.countAll();

      const enTaller = await equiposService.countAllTaller();

      if (!disponibles || !enTaller) {
        throw new Error("Ocurrio un error al obtener la cantidad total de equipos.")
      };

      res.status(200).json({ totalDisponibles: disponibles, totalEnTaller: enTaller });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Metodo para enviar equipos disponibles para ingreso al taller
  getEquiposDisponibles: async function(req, res) {
    try {
      // const equipos = 
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
    
};
