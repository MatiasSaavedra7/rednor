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
      let reajustes = await reajustesService.getAllByIdAlquiler(req.params.id)
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
        // let id = req.query.cliente;

        // Verifico si se ingreso una fecha de vencimiento.
        let fechaBaja = req.body.fecha_baja ? req.body.fecha_baja : null;

        // Obtengo la fecha actual.
        let fechaAlta = new Date();


        // Calculo el precio multiplicando el minimo de copias por el precio de cada una.
        let precio = req.body.minimo_copias * req.body.precio_copias;

        let data = {
          ...req.body,
          id_cliente: req.query.cliente,
          precio: req.body.minimo_copias * req.body.precio_copias,
          fecha_alta: new Date(),
          fecha_baja: req.body.fecha_baja ? req.body.fecha_baja : null,
          fecha_reajuste: new Date(),
          activo: true,
        };

        let alquiler = await alquileresService.create(data);
        if (alquiler) {
          // Actualizo el estado del equipo a 'Alquilado'
          // await equiposService.setEstadoAlquilado(alquiler.id_equipo);
          await equiposService.updateByPK({id_estado: 3}, alquiler.id_equipo);

          // Redirigir al usuario al detalle del alquiler
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

      let data = {
        fecha_baja: new Date(),   // Envio la fecha actual
        activo: false,            // Cambio el valor de activo a false
      };

      await alquileresService.updateByPK(data, req.params.id);

      // Actualizo el estado del equipo a Disponible.
      await equiposService.updateByPK(alquiler.id_equipo, {id_estado: 1});

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
      // Obtengo la informacion del alquiler a traves del id
      let alquiler = await alquileresService.getOneByPK(req.params.id);

      // Guardo los resultados de la validacion en errors
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

        // Creo el registro en la tabla de reajustes.
        await reajustesService.create(dataReajuste);

        // Luego, se procede a actualizar los datos del alquiler.
        // Armo un objeto que sera pasado como argumento.
        let dataToUpdate = {
          ...req.body,
          precio: req.body.minimo_copias * req.body.precio_copias,  //  Nuevo precio
          fecha_reajuste: new Date(),                               //  Fecha actual
        };

        // Actualizo los datos del alquiler en la base de datos
        await alquileresService.updateByPK(dataToUpdate, req.params.id);

        //  Redirigir al usuario al detalle del alquiler
        res.redirect(`/alquileres/detalles/${alquiler.id}`);
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
