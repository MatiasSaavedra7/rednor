const serviciosService = require("../../database/services/serviciosService");
const formasPagoService = require("../../database/services/formasPagoService");
const archivosServiciosService = require("../../database/services/archivosServiciosService");

const fs = require("fs");
const path = require("path");

module.exports = {
  // Mostrar todos los servicios
  getAll: async (req, res) => {
    try {
      const servicios = await serviciosService.getAll();  
      
      res.render("gastos/servicios2/servicios", { servicios });
    } catch (error) {
      res.send("Error en el servidor: " + error);
    }
  },

  // Mostrar el detalle de un servicio
  getOneByPK: async (req, res) => {
    try {
      // Informacion del Servicio
      const servicio = await serviciosService.getOneByPK(req.params.id);

      // Formas de Pago para nuevos pagos
      const formas_pago = await formasPagoService.getAll();

      res.render("gastos/servicios2/detalles", { servicio, formas_pago });
    } catch (error) {
      res.send("Error en el servidor: " + error);
    }
  },

  // Formulario de creación de un nuevo servicio
  create: async (req, res) => {
    try {
      return res.render("gastos/servicios2/registro");
    } catch (error) {
      return res.send("Error al crear el servicio: " + error);
    }
  },

  // Almacenar un nuevo servicio
  store: async (req, res) => {
    try {
      const data = req.body;

      const servicio = await serviciosService.create(data);

      res.redirect(`/gastos/servicios/${servicio.id}/detalles`);
    } catch (error) {
      res.send("Error al almacenar el servicio: " + error);
    }
  },

  // Formulario de edición de un servicio
  edit: async (req, res) => {
    try {
      // Obtener el Servicio a editar
      const servicio = await serviciosService.getOneByPK(req.params.id);

      res.render("gastos/servicios2/editarServicio", { servicio });

      // res.send(servicio);
    } catch (error) {
      res.send(error);
    }
  },
  
  // Actualizar un servicio
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const { nombre, descripcion, condiciones, dia_vencimiento, frecuencia, email, telefono } = req.body;

      const dataToUpdate = {
        nombre,
        descripcion,
        condiciones,
        dia_vencimiento,
        frecuencia,
        email,
        telefono,
      }

      await serviciosService.updateByPK(id, dataToUpdate);

      res.redirect(`/gastos/servicios/${id}/detalles`);
    } catch (error) {
      res.send(error);
    }
  },

  // Metodos para almacenar archivos del servicio
  almacenarArchivos: async (req, res) => {
    try {
      // Obtener el ID del servicio
      const { id_servicio } = req.body;

      // Recorro los archivos y los almaceno en la base de datos
      for (const file of req.files) {
        // Creo un objeto con la informacion del archivo
        const archivo = {
          id_servicio,
          nombre: file.filename,
        };
        
        // Almaceno el archivo en la base de datos
        await archivosServiciosService.create(archivo);
      }

      res.status(200).json({ message: "Archivos subidos correctamente." });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error almacenando archivos", error: error.message });
    }
  },

  eliminarArchivo: async (req, res) => {
    try {
      // Buscar el archivo en la base de datos
      const archivo = await archivosServiciosService.getOneByPK(req.params.id);

      // Si no se encontro el archivo
      if (!archivo) {
        return res.status(404).json({ message: "Archivo no encontrado." });
      }

      // Obtener la ruta del archivo
      const filePath = path.join(__dirname, "../../../public/docs/servicios", archivo.nombre);
      
      // Eliminar el archivo del servidor
      fs.unlink(filePath, async (error) => {
        if (error) {
          // Mostrar un mensaje por consola
          console.log(`Error eliminando el archivo del sistema de archivos: \n ${error.message}`);

          // Retornar un mensaje de error si no se pudo eliminar el archivo del servidor
          return res.status(500).json({ message: `Error eliminando el archivo del sistema de archivos: ${error.message}`/*, error: error.message*/ });
        }
        
        // Si el archivo se elimino del servidor, eliminar tambien de la base de datos
        await archivosServiciosService.deleteByPK(req.params.id);

        // Retornar un mensaje de exito
        return res.status(200).json({ message: "Archivo eliminado correctamente." });
      })

    } catch (error) {
      res.status(500).json({ message: `Error al eliminar el archivo: ${error.message}`/*, error: error.message*/ });
    }
  }
}