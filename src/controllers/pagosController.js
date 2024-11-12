const pagosService = require("../database/services/pagosService.js");
const gastosService = require("../database/services/gastosService.js");
const archivosPagosService = require("../database/services/archivosPagosService.js");
const formasPagoService = require("../database/services/formasPagoService.js");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);

module.exports = {
  getPagoById: async (req, res) => {
    try {
      const pago = await pagosService.getOneByPK(req.params.idPago);

      if (!pago) {
        return res.status(404).json({ message: "No se encontró el pago" });
      }

      res.json(pago);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el pago" });
    }
  },

  getLastPagoByIdGasto: async (req, res) => {
    try {
      const ultimoPago = await pagosService.getLastPagoByIdGasto(req.params.idServicio);
  
      if (!ultimoPago) {
        return res.status(404).json({ message: "No se encontraron pagos para este servicio" });
      }
  
      res.json(ultimoPago);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el último pago" });
    }
  },

  editarPago: async (req, res) => {
    try {
      let idPago = req.params.idPago;

      let formas_pago = await formasPagoService.getAll();

      let pago = await pagosService.getOneByPK(idPago);

      console.log(pago);

      if (!pago) {
        return res.status(404).json({ message: "No se encontró el pago" });
      }

      res.render("gastos/servicios/editarPago", { pago, formas_pago });
    } catch (error) {
      res.status(500).json({ message: "Error al editar el pago" });
      console.log(error); 
    }
  },

  actualizarPago: async (req, res) => {
    try {
      let idPago = req.params.idPago;

      let pago = await pagosService.getOneByPK(idPago);

      let gasto = await gastosService.getOneByPK(pago.id_gasto);

      if (!pago) {
        return res.status(404).json({ message: "No se encontró el pago" });
      }
      console.log(req.body);
      
      let { id_forma_pago, entidad_bancaria, nro_tarjeta, mes, cbu, cuit, divisa, monto} = req.body;

      if (id_forma_pago != 2) {
        entidad_bancaria = null;
        nro_tarjeta = null;
        cbu = null;
        cuit = null;
      }

      let dataToUpdate = {
        id_forma_pago,
        entidad_bancaria,
        nro_tarjeta,
        mes,
        cbu,
        cuit,
        divisa,
        monto
      };

      await pagosService.updateByPK(idPago, dataToUpdate);

      res.redirect(`/gastos/${gasto.id_categoria}/servicio/${gasto.id}`);
    } catch (error) {
      console.log(error);
    }
  },

  eliminarPago: async (req, res) => {
    try {
      // Para eliminar correctamente un pago, primero se deben eliminar los archivos asociados a este
      let pago = await pagosService.getOneByPK(req.params.idPago);
      
      let gastoId = pago.id_gasto;

      let archivos = await archivosPagosService.getAllByIdPago(req.params.idPago);

      if (archivos.length > 0) {
        // Eliminar archivos asociados al pago
        await Promise.all(archivos.map( async (archivo) => {
          // Ruta al archivo en el servidor
          let path = `public/docs/pagos/${archivo.nombre}`;
          try {
            // Eliminar archivo del sistema de archivos/servidor
            await unlinkAsync(path);
          } catch (error) {
            console.log("Error eliminando el archivo del sistema de archivos: " + error);
          }
          // Eliminar registro de archivo en la base de datos
          await archivosPagosService.deleteByPK(archivo.id);
        }))
      }

      // Eliminar el pago
      await pagosService.deleteByPK(req.params.idPago);

      let gasto = await gastosService.getOneByPK(gastoId);

      res.redirect(`/gastos/${gasto.id_categoria}/servicio/${gasto.id}`);
    } catch (error) {
      res.send("<h1>Error al eliminar el pago</h1>");
      console.log(error);
    }
  },
}