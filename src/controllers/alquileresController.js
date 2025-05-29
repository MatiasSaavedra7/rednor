const alquileresService = require("../database/services/alquileresService");
const clientesService = require("../database/services/clientesService");
const equiposService = require("../database/services/equiposService");
const firmasService = require("../database/services/firmasService");
const historialEstadosService = require("../database/services/historialEstadosService");
const reajustesService = require("../database/services/reajustesService");

const { validationResult } = require("express-validator");

module.exports = {
  alquileres: async (req, res) => {
    try {
      // Leer la firma seleccionada desde las cookies
      const firma = req.cookies.firma;

      // Traer todos los alquileres para la firma
      let alquileres = await alquileresService.getAllActivos(firma);

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
      let equipo = null;
      if (alquiler.id_equipo != null) {
        equipo = await equiposService.getOneByPK(alquiler.equipo.id);
      }
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
        const minimo_copias = parseInt(req.body.minimo_copias) || 0;
        const precio_copias = parseFloat(req.body.precio_copias) || 0;


        // Armo un objeto que sera pasado como argumento.
        let dataToUpdate = {
          ...req.body,
          precio: req.body.precio ? req.body.precio : minimo_copias * precio_copias,
          fecha_reajuste: new Date(),
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
  },

  delete: async (req, res) => {
    try {
      // Capturo el ID del Alquiler
      const idAlquiler = req.params.id;

      // Buscar el Alquiler en la base de datos
      const alquiler = await alquileresService.getOneByPK(idAlquiler);

      // Verificar si el Alquiler existe
      if (!alquiler) throw new Error("Alquiler no encontrado.");

      // Buscar los Reajustes asociados al Alquiler
      const reajustes = await reajustesService.getAllByIdAlquiler(idAlquiler);

      // Eliminar todos los registros
      for (const reajuste of reajustes) {
        await reajustesService.deleteByPK(reajuste.id);
      }

      // Eliminar el Alquiler de la base de datos
      await alquileresService.deleteByPK(idAlquiler);

      // Actualizar el estado del equipo a "Disponible"
      await equiposService.updateByPK({ id_estado: 1 }, alquiler.id_equipo);

      // Redireccionar al listado de alquileres
      res.redirect("/alquileres");
    } catch (error) {
      res.send("Ocurrio un error al intentar eliminar el alquiler: \n", error);
    }
  },

  cambiarEquipo: async (req, res) => {
    try {
      // Capturar el ID del Alquiler
      const idAlquiler = req.params.id;

      // Capturar el ID del Equipo que reemplazara al actual
      const { id_equipo } = req.body;

      // Buscar el alquiler en la base de datos
      const alquiler = await alquileresService.getOneByPK(idAlquiler);

      // Buscar el Equipo del Alquiler antes de ser reemplazado
      const equipo = await equiposService.getOneByPK(alquiler.id_equipo);

      // Verificar si el alquiler existe
      if (!alquiler) throw new Error("Alquiler no encontrado.");

      // Actualizar el ID del nuevo Equipo en el Alquiler
      await alquileresService.updateByPK({ id_equipo: id_equipo }, idAlquiler);

      // Actualizar el estado del nuevo equipo a "Alquilado"
      await equiposService.updateByPK({ id_estado: 3 }, id_equipo);

      // Analizar el estado del Equipo actual
      if (equipo && equipo.id_estado == 3) {
        // Despues del cambio, actualizar a "Disponible"
        await equiposService.updateByPK({ id_estado: 1 }, equipo.id);
      }
      
      // Responder con un mensaje de exito
      res.status(200).json({ message: "Equipo reemplazado correctamente." });
    } catch (error) {
      res.status(500).json({ message: `Ocurrio un error al intentar cambiar el equipo: ${error}` });
    }
  },

  getCantidadTotalAlquileres: async function(req, res) {
    try {
      const firma = req.cookies.firma;

      const alquileres = await alquileresService.countAllActivos(firma);

      if (!alquileres) {
        throw new Error("Ocurrio un error al obtener la cantidad total de alquileres.");
      };

      res.status(200).json({ total: alquileres });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
