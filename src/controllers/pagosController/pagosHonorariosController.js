const fs = require('fs');
const path = require('path');

const pagosHonorariosService = require("../../database/services/pagosHonorariosService");
const honorariosService = require("../../database/services/honorariosService");
const archivosPagosHonorariosService = require("../../database/services/archivosPagosHonorariosService");

module.exports = {
  // Traer todos los pagos
  getAll: async (req, res) => {
    try {
      const pagos = await pagosHonorariosService.getAllByIdHonorario(req.params.id);

      if (!pagos) {
        res.status(404).json({ message: "No se encontraron pagos" });
      }

      res.status(200).json(pagos);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  getAllByIdHonorario: async (req, res) => {
    try {
      const pagos = await pagosHonorariosService.getAllByIdHonorario(req.params.id);

      if (!pagos) {
        res.status(404).json({ message: "No se encontraron pagos" });
      };

      res.status(200).json(pagos);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  create: async (req, res) => {
    try {
      const honorario = await honorariosService.getOneByPK(req.params.id);
  
      const { id_forma_pago, entidad_bancaria, cbu, cuit, divisa, monto } = req.body;
  
      const fechaActual = new Date();
  
      const data = {
        id_honorario: honorario.id,
        id_forma_pago,
        entidad_bancaria,
        cbu,
        cuit,
        divisa,
        monto,
        fecha_creacion: fechaActual,
        fecha_vencimiento: new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, honorario.dia_vencimiento)
      };
  
      const pago = await pagosHonorariosService.create(data);
  
      if (!pago) {
        return res.status(400).json({ message: "No se pudo crear el pago" });
      }
  
      res.status(201).json(pago);
    } catch (error) {
      res.json({ error: error });
    }
  },

  getYears: async (req, res) => {
    try {
      let years = await pagosHonorariosService.getYears(req.params.id);

      if (!years) {
        return res.status(400).json({ message: "No se pudieron obtener los años" });
      }
      
      res.status(200).json(years);
    } catch (error) {
      res.json({ error: error });
    }
  },

  getPagosByYear: async (req, res) => {
    try {
      const idHonorario = req.params.idHonorario;
      const year = req.params.year;

      const pagos = await pagosHonorariosService.getPagosByYear(idHonorario, year);

      if (!pagos) {
        return res.status(400).json({ message: "No se encontraron pagos" });
      }

      res.status(200).json(pagos);
    } catch (error) {
      res.json({ error: error });
    }
  },

  getOneByPK: async (req, res) => {
    try {
      const pago = await pagosHonorariosService.getOneByPK(req.params.idPago);

      if (!pago) {
        res.status(404).json({ message: "No se encontro el pago" });
      }

      res.status(200).json(pago);
    } catch (error) {
      res.json({ error: error });
    }
  },

  getLastPagoByIdHonorario: async (req, res) => {
    try {
      const lastPago = await pagosHonorariosService.getLastPagoByIdHonorario(req.params.id);

      if (!lastPago) {
        res.status(404).json({ message: "No se pudo obtener el último pago" });
      }

      res.status(200).json(lastPago);
    } catch (error) {
      res.json({ error: error });
    }
  },

  almacenarArchivo: async (req, res) => {
    try {
      // Obtener el ID del Honorario
      const { id_honorario } = req.body;

      // Recorrer el array de archivos y almacenar en la base de datos
      for (const file of req.files) {
        // Crear un objeto literal con la informacion del archivo
        const archivo = {
          id_honorario,
          nombre: file.filename,
        };

        // Almacenar en la base de datos
        await archivosPagosHonorariosService.create(archivo);
      }

      // Retornar mensaje de exito
      res.status(200).json({ message: "Archivos subidos correctamente." });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  eliminarArchivo: async (req, res) => {
    try {
      // Buscar el Archivo en la Base de Datos
      const archivo = await archivosPagosHonorariosService.getOneByPK(req.params.id);

      // Si no se encontro el Archivo
      if (!archivo) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      }

      // Obtener la ruta del Archivo
      const filePath = path.join(__dirname, "../../../public/docs/honorarios", archivo.nombre);

      // Eliminar el Archivo del Servidor
      fs.unlink(filePath, async (error) => {
        if (error) {
          console.log("Error eliminando el archivo del Servidor", error);
          
          // Retornar un mensaje de error si no se pudo eliminar el Archivo del Servidor
          return res.status(500).json({ message: "Error eliminando el archivo del Servidor" });
        }

        // Si el Archivo se elimino del Servidor, eliminar tambien de la Base de Datos
        await archivosPagosHonorariosService.deleteByPK(req.params.id);

        // Retornar mensaje de exito
        return res.status(200).json({ message: "Archivo eliminado correctamente." });
      })
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};