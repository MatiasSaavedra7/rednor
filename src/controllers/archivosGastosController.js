const fs = require("fs");
const path = require("path");

const archivosGastosService = require("../database/services/archivosGastosService");
const gastosService = require("../database/services/gastosService");

module.exports = {
  getAllByIdGasto: async (req, res) => {
    try {
      const archivos = await archivosGastosService.getAllByIdGasto(req.params.idGasto);

      if (!archivos) {
        return res.status(404).send("No se encontraron archivos para el gasto");
      }

      res.status(200).json(archivos);
    } catch (error) {
      console.error("Error en el metodo getAllByIdGasto: ", error);
      res.status(500).json({ message: "Error en el metodo getAllByIdGasto", error: error.message });
      
    }  
  },

  almacenarArchivos: async (req, res) => {
    try {
      console.log(req.body);

      // Obtener el ID del gasto
      const { id_gasto } = req.body;

      // Recorro los archivos y los almaceno en la base de datos
      for (const file of req.files) {
        // Creo un objeto con la informacion del archivo
        let data = {
          id_gasto: id_gasto,
          nombre: file.filename,
        }

        // Almaceno el archivo en la base de datos
        await archivosGastosService.create(data);
      }

      res.status(200).json({ message: "Archivos subidos correctamente." });
    } catch (error) {
      console.error("Error almacenando archivos", error);
      res.status(500).json({ message: "Error almacenando archivos", error: error.message });
    }
  },

  eliminarArchivo: async (req, res) => {
    try {
      // Busco el archivo en la base de datos por su ID
      const archivo = await archivosGastosService.getOneByPK(req.params.id);

      // Si no se encontro el archivo
      if (!archivo) {
        return res.status(404).send("No se encontro el archivo");
      }

      // Obtengo la ruta del archivo
      const filePath = path.join(__dirname, "../../public/docs/gastos", archivo.nombre);

      // Elimino el archivo de la base de datos
      await archivosGastosService.deleteByPK(req.params.id);

      // Elimino el archivo del sistema de archivos
      fs.unlink(filePath, (error) => {
        if (error) {
          console.log("Error eliminando el archivo del sistema de archivos", error);
        }
      })

      res.status(200).json({ message: "Archivo eliminado correctamente." });
    } catch (error) {
      console.error("Error eliminando archivo", error);
      res.status(500).json({ message: "Error eliminando archivo", error: error.message });
    }
    
  },
}