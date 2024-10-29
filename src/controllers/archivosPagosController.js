const fs = require("fs");
const path = require("path");

const gastosService = require("../database/services/gastosService");
const pagosService = require("../database/services/pagosService");
const archivosPagosService = require("../database/services/archivosPagosService");

module.exports = {
  almacenarArchivos: async (req, res) => {
    try {
      console.log(req.body);
      
      // Obtener el ID del gasto
      const { id_pago } = req.body;

      // Recorro los archivos y los almaceno en la base de datos
      for (const file of req.files) {
        // Creo un objeto con la informacion del archivo
        let data = {
          id_pago: id_pago,
          nombre: file.filename,
        }

        // Almaceno el archivo en la base de datos
        await archivosPagosService.create(data);
      }
      // Fin del bucle

      // Redirijo a la pagina de pagos
      // res.redirect(`/gastos/${gasto.id_categoria}/servicio/${gasto.id}/pagos`)

      res.status(200).json({ message: "Archivos subidos correctamente. Mensaje enviado desde el controller.-" });
    } catch (error) {
      console.log("Error almacenando archivos", error);
      res.status(500).json({ message: "Error almacenando archivos", error: error.message });
    }
  },

  eliminarArchivo: async (req, res) => {
    try {
      // Obtener el ID del archivo a eliminar
      const archivoId = req.params.id;

      // Buscar en archivo en la base de datos
      const archivo = await archivosPagosService.getOneByPK(archivoId);

      if (!archivo) {
        return res.status(404).send("Archivo no encontrado");
      }

      // Eliminar el archivo de la base de datos
      await archivosPagosService.deleteByPK(archivoId);

      const filePath = path.join(__dirname, "../../public/docs/pagos", archivo.nombre);

      fs.unlink(filePath, (error) => {
        if (error) {
          console.log("Error eliminando el archivo del sistema de archivos", error);
        }
      })
      
      // Redirigir/refrescar a la pagina de detalle del gasto y pagos
      res.send({ error: false, message: "Archivo eliminado correctamente" });
    } catch (error) {
      console.log("Error eliminando archivo", error);
      res.status(505).send({ error: true, message: "Error eliminando archivo" });
    }
  }
}