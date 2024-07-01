const alquileresService = require("../database/services/alquileresService");
const clientesService = require("../database/services/clientesService");
const equiposService = require("../database/services/equiposService");
const firmasService = require("../database/services/firmasService");
// const marcasService = require("../database/services/marcasService");
const reajustesService = require("../database/services/reajustesService");

const { validationResult } = require("express-validator");

module.exports = {
  alquileres: async (req, res) => {
    try {
      let alquileres = await alquileresService.getAllActivos();
      // let marcas = await marcasService.getAll();
      res.render("alquileres/alquileres", { alquileres });
    } catch (error) {
      console.log(error);
    }
  },

  finalizados: async (req, res) => {
    try {
      let alquileres = await alquileresService.getAllInactivos()
      res.render("alquileres/finalizados", { alquileres })
    } catch (error) {
      console.log(error);
    }
  },

  detalleAlquiler: async (req, res) => {
    try {
      let alquiler = await alquileresService.getOneByPK(req.params.id);
      let cliente = await clientesService.getOneByPK(alquiler.cliente.id);
      let equipo = await equiposService.getOneByPK(alquiler.equipo.id);
      let reajustes = await reajustesService.getAllByField({id_alquiler: req.params.id})
      res.render("alquileres/detalleAlquiler", { alquiler, cliente, equipo, reajustes });
    } catch (error) {
      console.log(error);
    }
  },
  // FORMULARIO PARA REGISTRAR UN NUEVO ALQUILER
  create: async (req, res) => {
    try {
      let cliente = await clientesService.getOneByPK(req.query.cliente);
      let equipos = await equiposService.getAllDisponibles();
      let firmas = await firmasService.getAll();
      res.render("alquileres/registroAlquiler", {
        cliente,
        equipos,
        firmas,
      });
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        // Capturo el id del cliente desde el query params.
        let id = req.query.cliente;
        // Verifico si se ingreso una fecha de vencimiento.
        let fechaBaja = req.body.fecha_baja ? req.body.fecha_baja : null;
        // Obtengo la fecha actual y la convierto a formato ISO.
        let fechaAlta = new Date();
        let fechaAltaISO = fechaAlta.toISOString().split("T")[0];

        // Calculo el precio multiplicando el minimo de copias por el precio de cada una.
        let precio = req.body.minimo_copias * req.body.precio_copias;

        let data = {
          ...req.body,
          id_cliente: id,
          precio: precio,
          fecha_alta: fechaAltaISO,
          fecha_baja: fechaBaja,
          fecha_reajuste: fechaAltaISO,
          activo: true,
        };

        let alquiler = await alquileresService.create(data);
        if (alquiler) {
          await equiposService.setEstadoAlquilado(alquiler.id_equipo);
          res.redirect(`/alquileres/detalles/${alquiler.id}`);
        }
      } else {
        let cliente = await clientesService.getOneByPK(req.query.cliente);
        let equipos = await equiposService.getAllDisponibles();
        let firmas = await firmasService.getAll();
        res.render("alquileres/registroAlquiler", {
          errors: errors.mapped(),
          old: req.body,
          cliente,
          equipos,
          firmas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  finalizarContrato: async (req, res) => {
    try {
      // Capturo el ID del contrato que viene por parametro.
      let alquiler = await alquileresService.getOneByPK(req.params.id);
      // Obtengo la fecha actual y la convierto a formato ISO.
      let fechaBaja = new Date();
      let fechaBajaISO = fechaBaja.toISOString().split("T")[0];
      // Envio un objeto con la siguiente informacion, fecha_baja para informar la fecha en la que finalizo el contrato y 'activo: false' para poder agrupar los contratos finalizados.
      let data = {
        activo: false,
        fecha_baja: fechaBajaISO,
      };
      await alquileresService.updateByPK(data, alquiler.id);
      // Actualizo el estado del equipo a Disponible.
      await equiposService.setEstadoDisponible(alquiler.equipo.id);
      // Redirigir al usuario a la pagina de alquileres
      res.redirect("/alquileres");
    } catch (error) {
      console.log(error);
    }
  },

  reajuste: async (req, res) => {
    try {
      let alquiler = await alquileresService.getOneByPK(req.params.id);
      res.render("alquileres/reajusteAlquiler", { alquiler });
    } catch (error) {
      console.log(erorr);
    }
  },

  actualizarContrato: async (req, res) => {
    try {
      let alquiler = await alquileresService.getOneByPK(req.params.id);
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        // Primero tengo que crear un nuevo registro en la tabla de reajustes con los valores del alquiler antes de ser actualizados
        let dataReajuste = {
          id_alquiler: alquiler.id,
          minimo_copias: alquiler.minimo_copias,
          precio_copias: alquiler.precio_copias,
          precio: alquiler.precio,
          fecha_reajuste: alquiler.fecha_reajuste,
        };
        await reajustesService.create(dataReajuste);

        // Luego, se procede a actualizar los datos del alquiler.
        // Obtengo la fecha actual
        let fechaReajuste = new Date();
        let fechaReajusteISO = fechaReajuste.toISOString().split("T")[0];
        // Calculo el nuevo precio
        let precio = req.body.minimo_copias * req.body.precio_copias;
        // Armo un objeto que sera pasado como argumento.
        let dataToUpdate = {
          ...req.body,
          precio: precio,
          fecha_reajuste: fechaReajusteISO,
        };
        let alquilerUpdated = await alquileresService.updateByPK(
          dataToUpdate,
          req.params.id
        );
        if (alquilerUpdated) {
          res.redirect(`/alquileres/detalles/${alquiler.id}`);
        }
      } else {
        let alquiler = await alquileresService.getOneByPK(req.params.id);
        res.render("alquileres/reajusteAlquiler", {
          alquiler,
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
