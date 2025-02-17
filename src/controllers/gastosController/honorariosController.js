const honorariosService = require("../../database/services/honorariosService");
const formasPagoService = require("../../database/services/formasPagoService");
const archivosHonorariosService = require("../../database/services/archivosHonorariosService");

const fs = require("fs");
const path = require("path");


module.exports = {
  // Mostrar todos los Honorarios
  getAll: async (req, res) => {
    try {
      const honorarios = await honorariosService.getAll();

      res.render("gastos/honorarios/honorarios", { honorarios });
    } catch (error) {
      res.send("Error en el servidor", error);
    }
  },

  // Mostrar el detalle de un Honorario
  getOneByPK: async (req, res) => {
    try {
      // Informacion del Honorario
      const honorario = await honorariosService.getOneByPK(req.params.id);

      console.log("getOneByPK: ", honorario.toJSON());

      // Formas de Pago para nuevos pagos
      const formas_pago = await formasPagoService.getAll();

      res.render("gastos/honorarios/detalles", { honorario, formas_pago });
    } catch (error) {
      res.send(`Error en el servidor: ${error}`);
    }
  },

  // Formulario para registrar un nuevo Honorario
  create: async (req, res) => {
    try {
      res.render("gastos/honorarios/registro");
    } catch (error) {
      res.send("Error en el servidor", error);
    }
  },

  // Almacenar un nuevo Honorario
  store: async (req, res) => {
    try {
      const data = req.body;

      const honorario = await honorariosService.create(data);

      res.redirect(`/gastos/honorarios/${honorario.id}/detalles`);
    } catch (error) {
      res.send(`Error en el servidor: ${error}`);
    }
  },

  // Formulario para editar un Honorario
  edit: async (req, res) => {
    try {
      // Obtener el Honorario a editar
      const honorario = await honorariosService.getOneByPK(req.params.id);

      res.render("gastos/honorarios/editarHonorario", { honorario });
    } catch (error) {
      res.send(`Error en el servidor: ${error}`);
    }
  },

  // Actualizar informacion del Honorario
  update: async (req, res) => {
    try {
      const idHonorario = req.params.id;

      const { nombre, descripcion, condiciones, dia_vencimiento, frecuencia, email, telefono } = req.body;

      const dataToUpdate = {
        nombre,
        descripcion,
        condiciones,
        dia_vencimiento,
        frecuencia,
        email,
        telefono,
      };

      const honorario = await honorariosService.updateByPK(idHonorario, dataToUpdate);

      res.redirect(`/gastos/honorarios/${idHonorario}/detalles`);
    } catch (error) {
      res.send(`Error en el servidor: ${error}`);
    }
  },

  // Metodos para almacenar Archivos de Honorarios
  almacenarArchivos: async (req, res) => {
    try {
      // Obtener el ID del Honorario
      const { id_honorario} = req.body;

      // Recorrer el array de archivos y almacenar en la base de datos
      for (const file of req.files) {
        // Crear un objeto con la informacion del Archivo
        const archivo = {
          id_honorario,
          nombre: file.filename,
        };

        // Almacenar en la base de datos
        await archivosHonorariosService.create(archivo);
      }

      // Retornar mensaje de exito
      // res.status(200).json({ message: "Archivos subidos correctamente." });
      // Refrescar la pagina
      res.redirect(`/gastos/honorarios/${id_honorario}/detalles`);
    } catch (error) {
      res.send(`Error en el servidor: ${error}`);
    }
  },

  eliminarArchivo: async (req, res) => {
    try {
      // Buscar el archivo en la Base de Datos
      const archivo = await archivosHonorariosService.getOneByPK(req.params.id);

      // Si no se encontro el archivo
      if (!archivo) {
        // Retornar mensaje de error
        return res.status(404).json({message: "Archivo no encontrado."});
      }

      // Obtener la ruta del archivo
      const filePath = path.join(__dirname, "../../../public/docs/honorarios", archivo.nombre);
      
      // Eliminar el archivo del servidor
      fs.unlink(filePath, async (error) => {
        if (error) {
          // Mostrar un mensaje por consola
          console.log("Error eliminando el archivo del sistema de archivos", error);

          // Retornar mensaje de error si no se pudo eliminar el archivo del servidor
          return res.status(500).json({ message: "Error eliminando el archivo del sistema de archivos." });
        }

        // Si el archivo se elimino del servidor, eliminar tambien de la base de datos
        await archivosHonorariosService.deleteByPK(req.params.id);

        // Retornar mensaje de exito
        return res.status(200).json({ message: "Archivo eliminado correctamente." });
      })

    } catch (error) {
      res.status(500).json({ message: "Error: " + error.message });
    }
  }
}