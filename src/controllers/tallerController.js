const ingresosService = require("../database/services/ingresosService");
const equiposService = require("../database/services/equiposService");
const egresosService = require("../database/services/egresosService");
const informesService = require("../database/services/informesService");
const insumosService = require("../database/services/insumosService");

module.exports = {
  taller: async (req, res) => {
    try {
      // Obtener todos los ingresos registrados en la base de datos
      let ingresos = await ingresosService.getAll();

      // Filtrar aquellos ingresos cuyo estado sea 1, 2 o 3 (Disponibles)
      let ingresosEnTaller = ingresos.filter((ingreso) => ingreso.id_estado == 1 || ingreso.id_estado == 2 || ingreso.id_estado == 3);

      // Filtrar aquellos ingresos cuyo estado sea 4, 5, 6 o 7 (Historial)
      let ingresosHistorial = ingresos.filter((ingreso) => ingreso.id_estado == 4 || ingreso.id_estado == 5 || ingreso.id_estado == 6 || ingreso.id_estado == 7);
      res.render("taller/internos/taller", {
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
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      // console.log(ingreso.toJSON());
      let egreso = await egresosService.getOneByIdIngreso(ingreso.id);
      // console.log(egreso.toJSON());
      
      let informes = await informesService.getAllByIdIngreso(ingreso.id);
      let insumos = await insumosService.getAllByIdIngreso(ingreso.id);

      // Combinacion de informes e insumos en un solo array
      let combinedData = [
        ...informes.map(informe => ({
          type: 'informe',
          id: informe.id,
          detalle: informe.detalle,
          pedido_insumos: informe.pedido_insumos,
          fecha: informe.fecha_informe,
          id_usuario: informe.id_usuario,
          nombre_usuario: informe.usuario != null ? informe.usuario.nombre + " " + informe.usuario.apellido : "Usuario",
        })),
        ...insumos.map(insumo => ({
          type: 'insumo',
          id: insumo.id,
          observacion: insumo.observacion,
          nro_remito: insumo.nro_remito,
          fecha: insumo.fecha_entrega,
          id_usuario: insumo.id_usuario || "Usuario",
          nombre_usuario: insumo.usuario != null ? insumo.usuario.nombre + " " + insumo.usuario.apellido : "Usuario",
        }))
      ];

      // Ordenar los datos por fecha (de más antiguo a más reciente)
      combinedData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      res.render("taller/internos/detalleTaller", {
        ingreso,
        egreso,
        combinedData,
      });
    } catch (error) {
      console.log(error);
    }
  },

  ingreso: async (req, res) => {
    try {
      let equipo = await equiposService.getOneByPK(req.params.id);
      res.render("taller/internos/ingreso", { equipo });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarIngreso: async (req, res) => {
    try {
      // Obtener los datos del usuario logueado
      const user = req.session.userLogged;

      let data = {
        ...req.body,
        id_equipo: req.params.id,
        id_estado: 1,
        fecha_ingreso: new Date(),
        id_usuario: user.id,
      };

      // console.log(req.body);

      let ingreso = await ingresosService.create(data);

      if (ingreso) {
        // Actualizo el estado del Equipo a 'En Taller'
        await equiposService.updateByPK({ id_estado: 4}, ingreso.id_equipo);

        // Redirigir al usuario al detalle del ingreso
        res.redirect(`/taller/detalle/${ingreso.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  editarIngreso: async (req, res) => {
    try {
      const ingreso = await ingresosService.getOneByPK(req.params.id);

      res.render("taller/internos/editarIngreso", { ingreso });
    } catch (error) {
      console.log(" [ERROR] Ocurrio un error en el controller. tallerController.editarIngreso" + error);
    }
  },

  actualizarIngreso: async (req, res) => {
    try {
      const ingreso = await ingresosService.getOneByPK(req.params.id);

      const { motivo, detalle } = req.body;

      const dataToUpdate = {
        motivo,
        detalle,
      };

      const updatedIngreso = await ingresosService.updateByPK(ingreso.id, dataToUpdate);

      if (!updatedIngreso) {
        console.log("No se pudo actualizar el ingreso");
        res.send("No se pudo actualizar el ingreso");
      }
      
      res.redirect(`/taller/detalle/${ingreso.id}`);
    } catch (error) {
      console.log(" [ERROR] Ocurrio un error en el controller. tallerController.actualizarIngreso" + error);
    }
  },

  egreso: async (req, res) => {
    try {
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      let equipo = await equiposService.getOneByPK(ingreso.id_equipo);
      res.render("taller/internos/egreso", { ingreso, equipo });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarEgreso: async (req, res) => {
    try {
      // Obtener los datos del usuario logueado
      const user = req.session.userLogged;

      let data = {
        ...req.body,
        id_ingreso: req.params.id,
        fecha_egreso: new Date(),
        id_usuario: user.id,
      };

      let egreso = await egresosService.create(data);

      if (egreso) {
        let ingreso = await ingresosService.getOneByPK(req.params.id);

        // Analizo el estado seleccionado desde los radio inputs
        if (req.body.estado == "Sin arreglo") {
          // Actualizo el estado del Ingreso a 'Sin arreglo'
          await ingresosService.updateByPK(ingreso.id, { id_estado: 6});

          // Actualizo el estado del Equipo a 'Sin Arreglo'
          await equiposService.updateByPK({ id_estado: 5}, ingreso.id_equipo);
        }

        if (req.body.estado == "Disponible" && req.body.observacion != "") {
          // Actualizo el estado del Ingreso a 'Disponible c/ obs.'
          await ingresosService.updateByPK(ingreso.id, { id_estado: 7});

          // Actualizo el estado del Equipo a 'Disponible c/ obs.'
          await equiposService.updateByPK({id_estado: 2}, ingreso.id_equipo);
        }

        if (req.body.estado == "Disponible" && req.body.observacion == "") {
          //  Actualizo el estado del Ingreso a 'Disponible'
          await ingresosService.updateByPK(ingreso.id, { id_estado: 5 });
          
          // Actualizo el estado del Equipo a 'Disponible'
          await equiposService.updateByPK({id_estado: 1}, ingreso.id_equipo);
        }

        // Redirigir al usuario a la pagina de detalle del ingreso
        res.redirect(`/taller/detalle/${egreso.id_ingreso}`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  informe: async (req, res) => {
    try {
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      res.render("taller/internos/informe", { ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarInforme: async (req, res) => {
    try {
      // Obtener los datos del usuario logueado
      const user = req.session.userLogged;

      let data = {
        ...req.body,
        id_ingreso: req.params.id,
        pedido_insumos: req.body.pedido_insumos ? true : false,
        fecha_informe: new Date(),
        id_usuario: user.id,
      };

      await informesService.create(data);

      // Analizo si se hizo un pedido de insumos
      if (req.body.pedido_insumos) {
        // Si es verdadero, entonces actualizo el estado del ingreso a 'En espera de insumos'
        await ingresosService.updateByPK(req.params.id, { id_estado: 2 });
      }

      // Redirecciono al detalle
      res.redirect(`/taller/detalle/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },

  editarInforme: async (req, res) => {
    try {
      const informe = await informesService.getOneByPK(req.params.id);

      const ingreso = await ingresosService.getOneByPK(informe.id_ingreso);

      res.render("taller/internos/editarInforme", { ingreso, informe });
    } catch (error) {
      let message = `[ERROR] Error en tallerController.editarInforme: ${error}`;
      console.log(message);
    }
  },

  actualizarInforme: async (req, res) => {
    try {
      const informe = await informesService.getOneByPK(req.params.id);

      const { detalle } = req.body;

      const dataToUpdate = {
        detalle,
      };

      const updatedInforme = await informesService.updateByPK(informe.id, dataToUpdate);

      if (!updatedInforme) {
        console.log("No se pudo actualizar el informe");
        res.send("No se pudo actualizar el informe");
      }

      res.redirect(`/taller/detalle/${informe.id_ingreso}`);
      
    } catch (error) {
      let message = `[ERROR] Error en tallerController.actualizarInforme: ${error}`;
      console.log(message);
    }
  },

  insumos: async (req, res) => {
    try {
      let informe = await informesService.getOneByPK(req.params.idInforme);
      let ingreso = await ingresosService.getOneByPK(informe.id_ingreso);
      
      res.render("taller/internos/insumos", { informe, ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarInsumos: async (req, res) => {
    try {
      let informe = await informesService.getOneByPK(req.params.idInforme);

      // Obtener los datos del usuario logueado
      const user = req.session.userLogged;

      // Creo un objeto 'data' con la informacion para almacenar en los informes de insumos
      let data = {
        ...req.body,
        id_informe: informe.id,
        id_ingreso: informe.id_ingreso,
        fecha_entrega: new Date(),
        id_usuario: user.id,
      };

      // Almaceno el registro en la base de datos
      await insumosService.create(data);

      // Actualizo el estado del ingreso a 'En Taller'
      await ingresosService.updateByPK(informe.id_ingreso, { id_estado: 1});

      // Actualizo el valor de pedido_insumos de la tabla ingresos a false
      await informesService.updateByPK(informe.id, { pedido_insumos: false});

      // Redirecciono al detalle del ingreso
      res.redirect(`/taller/detalle/${informe.id_ingreso}`);
    } catch (error) {
      console.log(error);
    }
  },

  getHistorialTaller: async (req, res) => {
    try {
      // Capturar el ID y la Fecha de Ingreso desde el body
      const { id_equipo, fecha_ingreso } = req.body;
      // console.log(`ID Equipo: ${id_equipo}, Fecha de Ingreso: ${fecha_ingreso}`);

      
      // Obtener los ultimos 5 ingresos al Taller.
      const ingresos = await ingresosService.getLastFiveByIdEquipo(id_equipo, fecha_ingreso);
      // console.log(ingresos);
      
      res.status(200).json(ingresos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getDetalleTaller: async (req, res) => {
    try {
      // Capturar el ID del Ingreso
      const idIngreso = req.params.idIngreso;

      // Obtener el Ingreso
      const ingreso = await ingresosService.getOneByPKAPI(idIngreso);
      
      // Obtener todos los Informes asociados al Ingreso
      const informes = await informesService.getAllByIdIngreso(idIngreso);
      
      // Obtener todos los Insumos asociados al Ingreso
      const insumos = await insumosService.getAllByIdIngreso(idIngreso);

      // Obtener el Egreso
      const egreso = await egresosService.getOneByIdIngresoAPI(idIngreso);
      
      // Combinar en un solo vector los Informes e Insumos
      const combinedData = [
        ...informes.map(informe => ({
          type: "informe",
          id: informe.id,
          fecha: informe.fecha_informe,
          detalle: informe.detalle,
          pedido_insumos: informe.pedido_insumos,
          id_usuario: informe.id_usuario,
          nombre_usuario: informe.usuario != null ? `${informe.usuario.nombre} ${informe.usuario.apellido}` : "Usuario"
        })),

        ...insumos.map(insumo => ({
          type: "insumo",
          id: insumo.id,
          fecha: insumo.fecha_entrega,
          observacion: insumo.observacion,
          nro_remito: insumo.nro_remito,
          id_usuario: insumo.id_usuario,
          nombre_usuario: insumo.usuario != null ? `${insumo.usuario.nombre} ${insumo.usuario.apellido}` : "Usuario",
        })),
      ];

      // Ordenar el vector combinedData por fecha(de mas antiguo a mas reciente)
      combinedData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      const data = {
        ingreso,
        combinedData,
        egreso,
      }
      
      // Enviar el resultado al cliente
      res.status(200).json(data);

    } catch (error) {
      res.status(500).json({ message: error.message});
    }
  }
};
