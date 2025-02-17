const fs = require('fs');
const path = require('path');

const pagosServiciosService = require("../../database/services/pagosServiciosService");
const serviciosService = require("../../database/services/serviciosService");
const archivosPagosServiciosService = require("../../database/services/archivosPagosServiciosService");

module.exports = {
  getAll: async (req, res) => {
    try {
      const pagos = await pagosServiciosService.getAll();

      res.json(pagos);
    } catch (error) {
      res.json({ error: error });
    }
  },

  getAllByIdServicio: async (req, res) => {
    try {
      const pagos = await pagosServiciosService.getPagosByIdServicio(req.params.id);

      res.json(pagos);
    } catch (error) {
      res.json( { error: error });
    }
  },

  create: async (req, res) => {
    try {
      const servicio = await serviciosService.getOneByPK(req.params.id);

      const { id_forma_pago, entidad_bancaria, cbu, cuit, divisa, monto } = req.body;

      const fechaActual = new Date();

      const data = {
        id_servicio: servicio.id,
        id_forma_pago,
        entidad_bancaria,
        cbu,
        cuit,
        divisa,
        monto,
        fecha_pago: fechaActual,
        fecha_vencimiento: new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, servicio.dia_vencimiento),
      }

      const pago = await pagosServiciosService.create(data);

      if (!pago) {
        return res.status(400).json({ message: "No se pudo crear el pago" });
      }

      res.json(pago);
    } catch (error) {
      res.json({ error: error });
    }
  },

  getYears: async (req, res) => {
    try {
      let years = await pagosServiciosService.getYears(req.params.id);
      
      if (!years) {
        return res.status(400).json({ message: "No se pudieron obtener los años" });
      }
      
      res.json(years);
    } catch (error) {
      let errorMessage = `[ERROR]: Error en pagosServiciosController.getYears: ${error}`;
      console.log(errorMessage);
      res.json({ error: errorMessage });
    }
  },

  getPagosByYear: async (req, res) => {
    try {
      const idServicio = req.params.id;
      const year = req.params.year;

      const pagos = await pagosServiciosService.getPagosByYear(idServicio, year);

      if (!pagos) {
        return res.status(400).json({ message: "No se pudieron obtener los pagos" });
      }

      res.json(pagos);
    } catch (error) {
      let errorMessage = `[ERROR]: Error en pagosServiciosController.getPagosByYear: ${error}`;
      console.log(errorMessage);
      res.json({ error: errorMessage });
    }
  },

  getOnePagoByPK: async (req, res) => {
    try {
      const idPago = req.params.idPago;

      const pago = await pagosServiciosService.getOneByPK(idPago);

      if (!pago) {
        return res.status(400).json({ message: "No se pudo obtener el pago" });
      }

      res.json(pago);
    } catch (error) {
      let errorMessage = `[ERROR]: Error en pagosServiciosController.getOnePagoByPK: ${error}`;
      console.log(errorMessage);
      res.json({ error: errorMessage });
    }
  },

  getLastPagoByIdServicio: async (req, res) => {
    try {
      const lastPago = await pagosServiciosService.getLastPagoByIdServicio(req.params.id);
      
      if (!lastPago) {
        return res.status(404).json({ message: "No se pudo obtener el último pago" });
      };

      res.json(lastPago);
    } catch (error) {
      let errorMessage = `[ERROR]: Error en pagosServiciosController.getLastPagoByIdServicio: ${error}`;
      console.log(errorMessage);
      res.json({ error: errorMessage });
    }
  },

  almacenarArchivo: async (req, res) => {
    try {
      // Obtener el ID del Pago
      const { id_pago_servicio } = req.body;

      // Recorrer el array de archivos y almacenar en la base de datos
      for (const file of req.files) {
        // Crear un objeto con la informacion del archivo
        const archivo = {
          id_pago_servicio,
          nombre: file.filename,
        };

        // Almacenar en la base de datos
        await archivosPagosServiciosService.create(archivo);
      }

      // Retornar mensaje de exito
      res.status(200).json({ message: "Archivos subidos correctamente." });
    } catch (error) {
      let consoleMessage = `[ERROR]: Error en pagosServiciosController.almacenarArchivo: ${error}`;
      console.log(consoleMessage);
      res.status(400).json({ error });
    }
  },

  eliminarArchivo: async (req, res) => {
    try {
      // Buscar el archivo en la base de datos
      const archivo = await archivosPagosServiciosService.getOneByPK(req.params.id);

      // Si no se encontro el archivo
      if (!archivo) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      };

      // Obtener la ruta del archivo
      const filePath = path.join(__dirname, "../../../public/docs/pagos_servicios", archivo.nombre);
      
      // Eliminar el archivo del servidor
      fs.unlink(filePath, async (error) => {
        if (error) {
          console.log("Error eliminando el archivo del sistema de archivos", error);

          // Retornar un mensaje de error si no se pudo eliminar el archivo del servidor
          return res.status(500).json({ message: `Error eliminando el archivo del servidor: ${error.message}` });
        }

        // Si el archivo se elimino del servidor, eliminar tambien de la base de datos
        await archivosPagosServiciosService.deleteByPK(req.params.id);

        // Retornar mensaje de exito
        return res.status(200).json({ message: "Archivo eliminado correctamente." });
      });

    } catch (error) {
      res.status(500).json({ message: "Error eliminando el archivo", error: error.message });
    }
  },
}