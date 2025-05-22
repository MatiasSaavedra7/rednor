const marcasService = require("../database/services/marcasService");
const tiposService = require("../database/services/tiposEquiposService");
const equiposExternosService = require("../database/services/equiposExternosService");
const ingresosExternosService = require("../database/services/ingresosExternosService");
const egresosExternosService = require("../database/services/egresoExternoService");
const informesExternosService = require("../database/services/informesExternosService");
const insumosExternosService = require('../database/services/insumosExternosService');
const formasPagoService = require("../database/services/formasPagoService");

// Notificaciones
const notificacionesService = require("../database/services/notificacionesService");

const notificacionesUsuariosService = require("../database/services/notificacionesUsuariosService");

// Requerir Socket.IO para emitir notificaciones.
const { getIo } = require("../socket");

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
      let ingresosEnTaller = ingresos.filter((ingreso) =>[1, 2, 3].includes(ingreso.id_estado));

      
      let ingresosHistorial = ingresos.filter((ingreso) => [4, 5, 6, 7, 8].includes(ingreso.id_estado));

      res.render("taller/externos/tallerExterno", {
        ingresos,
        ingresosEnTaller,
        ingresosHistorial,
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
          id: informe.id,
          id_usuario: informe.id_usuario,
          nombre_usuario: informe.usuario != null ? informe.usuario.nombre + " " + informe.usuario.apellido : "Usuario",
        })),
        ...insumos.map(insumo => ({
          type: 'insumo',
          fecha: insumo.fecha_entrega,
          observacion: insumo.observacion,
          nro_remito: insumo.nro_remito,
          id: insumo.id,
          id_usuario: insumo.id_usuario,
          nombre_usuario: insumo.usuario != null ? insumo.usuario.nombre + " " + insumo.usuario.apellido : "Usuario",
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
      // Informacion del Usuario
      const user = req.session.userLogged;

      // Socket.IO
      const io = getIo();

      let data = {
        ...req.body,
        id_estado: 1,
        id_usuario: user.id,
        // fecha_ingreso: new Date(),
      };

      const equipoExterno = await equiposExternosService.getOneByPK(req.body.id_equipo);
      
      // Guardar el Ingreso en la base de datos.
      const ingresoExterno = await ingresosExternosService.create(data);

      const notificacion = {
        id_usuario: user.id,
        titulo: "Nuevo Ingreso",
        mensaje: `${user.nombre} ${user.apellido} ha ingresado el equipo ${equipoExterno.marca} ${equipoExterno.modelo} (numero de serie ${equipoExterno.numero_serie}) al taller`,
        fecha: new Date(),
        leida: false,
        url: `/taller/externos/detalle/${ingresoExterno.id}`,
      };

      // Guardar la notificacion en la base de datos
      await notificacionesService.create(notificacion, user.id);

      // Emitir la notificacion al Usuario con Socket.io
      io.emit("nueva_notificacion", notificacion);

      res.redirect(`/taller/externos/detalle/${ingresoExterno.id}`);
    } catch (error) {
      console.log(error);
      res.send(error);
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
      };

      await ingresosExternosService.updateByPK(req.params.id, data);

      res.redirect(`/taller/externos/detalle/${req.params.id}`);
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
      // Obtengo los datos del usuario logueado
      const user = req.session.userLogged;

      // Socket.io
      const io = getIo();

      // Traer la informacion del Ingreso Externo
      const ingresoExterno = await ingresosExternosService.getOneByPK(req.params.id);

      // Traer la informacion del Equipo Externo
      const equipoExterno = await equiposExternosService.getOneByPK(ingresoExterno.id_equipo);

      // Creo el objeto con la informacion del informe
      let data = {
        ...req.body,
        id_ingreso_externo: req.params.id,
        pedido_insumos: req.body.pedido_insumos ? true : false,
        id_usuario: user.id,
        fecha_informe: new Date(),
      };

      // Creo el registro del informe en la base de datos
      await informesExternosService.create(data);

      // Notificacion
      const notificacion = {
        id_usuario: user.id,
        titulo: data.pedido_insumos ? "Pedido de Insumos" : "Informe",
        mensaje: data.pedido_insumos ? `${user.nombre} ${user.apellido} ha realizado un pedido de insumos para el equipo ${equipoExterno.marca} ${equipoExterno.modelo} (numero de serie ${equipoExterno.numero_serie}).` : `${user.nombre} ${user.apellido} ha realizado un informe sobre el equipo ${equipoExterno.marca} ${equipoExterno.modelo} (numero de serie ${equipoExterno.numero_serie}).` ,
        fecha: new Date(),
        leida: false,
        url: `/taller/externos/detalle/${req.params.id}`
      }

      // Almacenar la notificacion en la base de datos
      await notificacionesService.create(notificacion, user.id);

      // Emitir la notificacion al Usuario con Socket.IO
      io.emit("nueva_notificacion", notificacion);

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

  eliminarInforme: async (req, res) => {
    try {
      // Capturar el ID del Informe
      const id = req.params.id;

      // Buscar si hay Insumos creados para el Informe
      const insumos = await insumosExternosService.getOneByIdInforme(id);
      
      // Si hay Insumos, borrar de la base de datos
      if (insumos) {
        await insumosExternosService.deleteByPK(insumos.id);
      }

      // Borrar el Informe de la base de datos
      const data = await informesExternosService.deleteByPK(id);

      return res.status(200).json({ message: "Informe eliminado correctamente"});
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
      //  Traer la informacion del Informe Externo
      const informe = await informesExternosService.getOneByPK(req.params.idInforme);

      // Traer la informacion del Ingreso Externo
      const ingresoExterno = await ingresosExternosService.getOneByPK(informe.id_ingreso_externo);

      // Informacion del Equipo Externo
      const equipoExterno = await equiposExternosService.getOneByPK(ingresoExterno.id_equipo)

      // Obtener la informacion del Usuario
      const user = req.session.userLogged;

      // Socket.IO
      const io = getIo();

      // Creo un objeto 'data' con la informacion para almacenar en los informes de insumos
      let data = {
        ...req.body,
        id_informe_externo: informe.id,
        id_ingreso_externo: informe.id_ingreso_externo,
        id_usuario: user.id,
        fecha_entrega: new Date(),
      };

      // Almaceno en la base de datos los insumos
      await insumosExternosService.create(data);

      // Actualizo el estado del ingreso a 'En Taller'
      await ingresosExternosService.updateByPK(informe.id_ingreso_externo, { id_estado: 1 });

      // Actualizo el valor de pedido_insumos de la tabla ingresos a false
      await informesExternosService.updateByPK(informe.id, { pedido_insumos: false });

      // Notificacion
      const notificacion = {
        id_usuario: user.id,
        titulo: "Entrega de Insumos",
        mensaje: `${user.nombre} ${user.apellido} ha entregado insumos para el equipo ${equipoExterno.marca} ${equipoExterno.modelo} (numero de serie ${equipoExterno.numero_serie})`,
        fecha: new Date(),
        leida: false,
        url: `/taller/externos/detalle/${informe.id_ingreso_externo}`,
      };

      // Almacenar la notificacion en la base de datos
      await notificacionesService.create(notificacion, user.id);

      // Emitir la notificacion al Usuario con Socket.IO
      io.emit("nueva_notificacion", notificacion);

      // Redirecciono al usuario al detalle del ingresos
      res.redirect(`/taller/externos/detalle/${informe.id_ingreso_externo}`);
    } catch (error) {
      console.log(error);
    }
  },

  eliminarInsumos: async (req, res) => {
    try {
      let id = req.params.id;      
    } catch (error) {
      console.log(error);
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
      const ingreso = await ingresosExternosService.getOneByPK(req.params.id);

      // Informacion del Equipo Externo
      const equipoExterno = await equiposExternosService.getOneByPK(ingreso.id_equipo);

      // Obtengo los datos del usuario logueado
      const user = req.session.userLogged;

      // Socket.IO
      const io = getIo();

      let titulo;
      let mensaje;

      // Creo el objeto con la informacion para guardar en el registro de egresos.
      let data = {
        ...req.body,
        id_forma_pago: null,
        id_ingreso_externo: ingreso.id,
        id_usuario: user.id,
        fecha_egreso: new Date(),
      };

      // Almaceno en la base de datos.
      await egresosExternosService.create(data);

      // Analizo el estado del equipo
      if (req.body.estado == "Listo para retirar") {
        // Actualizo el estado del equipo a 'Listo para retirar'.
        await ingresosExternosService.updateByPK(ingreso.id, { id_estado: 3 });
        titulo = "Equipo listo para retirar";
        mensaje = `${user.nombre} ${user.apellido} informa que el equipo ${equipoExterno.marca} ${equipoExterno.modelo} (numero de serie ${equipoExterno.numero_serie}) esta listo para retirar.`
      } else {
        // Actualizo el estado del equipo a 'Sin arreglo'
        await ingresosExternosService.updateByPK(ingreso.id, { id_estado: 6 });
        titulo = "Equipo sin arreglo";
        mensaje = `${user.nombre} ${user.apellido} informa que el equipo ${equipoExterno.marca} ${equipoExterno.modelo} (numero de serie ${equipoExterno.numero_serie}) no tiene arreglo`
      }

      // Emitir la notificacion al Usuario con Socket.io
      const notificacion = {
        id_usuario: user.id,
        titulo: titulo,
        mensaje: mensaje,
        fecha: new Date(),
        leida: false,
        url: `/taller/externos/detalle/${ingreso.id}`
      }

      // Almacenar la notificacion en la base de datos
      await notificacionesService.create(notificacion, user.id);

      // Emitir la notificacion al Usuario con Socket.IO
      io.emit("nueva_notificacion", notificacion);

      // Redirecciono al usuario a la pagina de detalle del ingreso.
      res.redirect(`/taller/externos/detalle/${ingreso.id}`);
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
      res.redirect(`/taller/externos/detalle/${egreso.id_ingreso_externo}`);
    } catch (error) {
      console.log(error);
    }
  },

  getHistorialTaller: async (req, res) => {
    try {
      // Capturar el ID y la Fecha de Ingreso del body
      const { idEquipo, fechaIngreso } = req.body;

      // Obtener los ingresos del equipo
      const ingresos = await ingresosExternosService.getLastFiveByIdEquipo(idEquipo, fechaIngreso);
      
      // Validar que existan ingresos
      if (!ingresos) {
        return res.status(404).json({ message: "No se encontraron datos del ingreso" });
      }

      // Retornar los ingresos al usuario
      res.status(200).json(ingresos);
    } catch (error) {
      // Error en el servidor
      res.status(500).json({ message: error.message });
    }
  },

  // Metodo para traer el detalle completo del ingreso de un Equipo al Taller(Ingreso, Informes, Insumos y Egreso)
  getDetalleTaller: async (req, res) => {
    try {
      // Capturar el ID del Ingreso
      const idIngreso = req.params.idIngreso;

      // Obtener el Ingreso
      const ingreso = await ingresosExternosService.getOneByPK(idIngreso);
      
      // Validar que exista el ingreso
      if (!ingreso) {
        return res.status(404).json({ message: "No se encontró el ingreso" });
      }
      
      // Obtener el Egreso
      const egreso = await egresosExternosService.getOneByIdIngreso(ingreso.id);
      // Obtener los Informes
      const informes = await informesExternosService.getAllByIdIngreso(ingreso.id);
      // Obtener los Insumos
      const insumos = await insumosExternosService.getAllByIdIngreso(ingreso.id);
      
      // Combinar en un solo vector los Informes e Insumos
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
        })),
      ];

      // Ordenar el vector combinedData por fecha(de mas antiguo a mas reciente)
      combinedData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      
      // Construir la respuesta con todos los datos del Ingreso, Informes, Insumos y Egreso.
      const data = {
        ingreso,
        combinedData,
        egreso,
      }

      // Retornar la informacion
      res.status(200).json(data);
    } catch (error) {
      res.send(error);
    }
  },

  eliminarRegistro: async (req, res) => {
    try {
      // Capturar el ID del Ingreso
      const id = req.params.id;

      // Traer el Ingreso
      const ingreso = await ingresosExternosService.getOneByPK(id);

      // Traer todos los Informes
      const informes = await informesExternosService.getAllByIdIngreso(id);

      // Eliminar todos los Informes
      if (informes.length > 0) {
        // Bucle for...of para recorrer cada elemento del array informes
        for (const informe of informes) {
          // Traer los Insumos por cada Informe(si es que los hay)
          const insumo = await insumosExternosService.getOneByIdInforme(informe.id);

          // Eliminar Insumos
          if (insumo) {
            await insumosExternosService.deleteByPK(insumo.id);
          }

          // Eliminar Informe
          await informesExternosService.deleteByPK(informe.id);
        }
      }

      // Traer el Egreso
      const egreso = await egresosExternosService.getOneByIdIngreso(id);

      // Eliminar el Egreso
      if (egreso) {
        await egresosExternosService.deleteByPK(egreso.id);
      }

      // Por ultimo, eliminar el Ingreso
      await ingresosExternosService.deleteByPK(ingreso.id);

      res.status(200).json({ message: "Registro eliminado correctamente." });
    } catch (error) {
      console.log(error);
    }
  },

  informarRetiro: async (req, res) => {
    try {
      // Capturar el ID del Ingreso
      const idIngreso = req.params.id;

      // Traer la informacion del Alquiler
      const ingreso = await ingresosExternosService.getOneByPK(idIngreso);

      // Validar que exista el Alquiler
      if (!ingreso) {
        return res.status(404).json({ message: "No se encontró el ingreso" });
      }

      // Actualizar el estado del Ingreso a "Retirado" y la Fecha de Retiro
      await ingresosExternosService.updateByPK(idIngreso, { id_estado: 8});

      // Retornar un mensaje de exito
      res.status(200).json({ message: "El equipo ha sido retirado." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};
