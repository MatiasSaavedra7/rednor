const alquileresService = require("../database/services/alquileresService");
const clientesService = require("../database/services/clientesService");
const equiposService = require("../database/services/equiposService");
const firmasService = require("../database/services/firmasService");
const reajustesService = require("../database/services/reajustesService");

const { validationResult } = require("express-validator");

module.exports = {
  alquileres: async (req, res) => {
    try {
      let alquileres = await alquileresService.getAllActivos();
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
      
      if (errors) {
        console.log("Hay errores presentes en el formulario");
        console.log(errors);
      }

      console.log(req.body);
      
      // Si no hay errores, almacenar el Alquiler
      if (errors.isEmpty()) {
        // Validar y transformar valores antes de usarlos
        const minimo_copias = parseInt(req.body.minimo_copias) || 0;
        const precio_copias = parseFloat(req.body.precio_copias) || 0;

        // Objeto con la informacion del Alquiler a almacenar
        let data = {
          ...req.body,
          id_cliente: req.query.cliente,
          precio: req.body.precio ? req.body.precio : minimo_copias * precio_copias,
          fecha_alta: new Date(),
          fecha_baja: req.body.fecha_baja ? req.body.fecha_baja : null,
          fecha_reajuste: new Date(),
          activo: true,
          numero_facturacion: req.body.numero_facturacion || null,
        };

        // Almacenar en base de datos
        let alquiler = await alquileresService.create(data);

        // Si el Alquiler se almaceno correctamente
        if (alquiler) {
          // Actualizo el estado del equipo a 'Alquilado'
          await equiposService.updateByPK({id_estado: 3}, alquiler.id_equipo);

          // Redirigir al usuario al detalle del alquiler
          // res.redirect(`/alquileres/detalles/${alquiler.id}`);
          res.status(200).json({ url: `/alquileres/detalles/${alquiler.id}` })
        }

        // Si hay errores
      } else {
        let cliente = await clientesService.getOneByPK(req.query.cliente);
        let equipos = await equiposService.getAllDisponibles();
        let firmas = await firmasService.getAll();
        // res.render("alquileres/registroAlquiler", {
        //   errors: errors.mapped(),
        //   old: req.body,
        //   cliente,
        //   equipos,
        //   firmas,
        // });
        res.status(500).json({
          errors: errors.mapped(),
          old: req.body,
          cliente,
          equipos,
          firmas
        })
      }
    } catch (error) {
      console.log(error);
    }
  },

  finalizarContrato: async (req, res) => {
    try {
      // Capturo el ID del contrato que viene por parametro.
      let alquiler = await alquileresService.getOneByPK(req.params.id);

      // Crear un objeto con la informacion a actualizar del registro
      let data = {
        fecha_baja: new Date(), // Fecha actual
        activo: false,          // Cambio el valor del campo activo del alquiler a false
      };

      // Actualizar el Alquiler
      await alquileresService.updateByPK(data, req.params.id);

      // Actualizo el estado del equipo a Disponible.
      await equiposService.updateByPK({id_estado: 1}, alquiler.id_equipo);

      // Redirigir al usuario a la pagina de alquileres
      res.redirect("/alquileres");
    } catch (error) {
      console.log(error);
    }
  },


  //  Vista para reajustar el contrato
  reajuste: async (req, res) => {
    try {
      let alquiler = await alquileresService.getOneByPK(req.params.id);
      res.render("alquileres/reajusteAlquiler", { alquiler });
    } catch (error) {
      console.log(erorr);
    }
  },

  //  Accion para actualizar el contrato reajustado
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

  //  Editar info de contrato
  edit: async (req, res) => {
    try {
      let alquiler = await alquileresService.getOneByPK(req.params.id);
      let firmas = await firmasService.getAll();
      res.render("alquileres/editarAlquiler", { alquiler, firmas });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      let errors = validationResult(req);

      console.log(errors);
      
      console.log(req.body);

      if(errors.isEmpty()){
        const minimoCopias = parseInt(req.body.minimo_copias) || 0;
        const precioCopias = parseFloat(req.body.precio_copias) || 0;

        let dataToUpdate = {
         ...req.body,
          precio: req.body.precio ? req.body.precio : minimoCopias * precioCopias,
          numero_facturacion: req.body.numero_facturacion ? req.body.numero_facturacion : null,
        };

        await alquileresService.updateByPK(dataToUpdate, req.params.id);

        res.redirect(`/alquileres/detalles/${req.params.id}`);
      } else {
        let alquiler = await alquileresService.getOneByPK(req.params.id);
        let firmas = await firmasService.getAll();
        res.render("alquileres/editarAlquiler", {
          errors: errors.mapped(),
          old: req.body,
          alquiler,
          firmas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
