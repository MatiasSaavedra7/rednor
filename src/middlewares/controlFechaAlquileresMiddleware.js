const alquileresService = require("../database/services/alquileresService");
const equiposService = require("../database/services/equiposService");

async function controlVencimientos(req, res, next) {
  try {
    // Traigo todos los registros con fecha de vencimiento
    let alquileres = await alquileresService.getAllActivosConVencimiento();
  
    // Obtengo la fecha actual (hoy)
    let fechaHoy = new Date();
  
    for (const alquiler of alquileres) {
      // Convertir directamente a objeto Date
      const fechaBaja = new Date(alquiler.fecha_baja);
  
      if (fechaBaja < fechaHoy) {
        // Si fechaBaja es menor a fechaHoy, actualizar el estado del alquiler y el equipo

        // Finalizar el alquiler (cambiar el valor del campo activo a false)
        await alquileresService.updateByPK({ activo: false }, alquiler.id);
  
        // Cambiar el estado del equipo a Disponible
        await equiposService.updateByPK({id_estado: 1}, alquiler.id_equipo);
      }
    }
  
    next();
  } catch (error) {
    console.log("Error controlando vencimientos: " + error);
    res.status(500).send("Error controlando vencimientos: " + error);
  }
}

module.exports = controlVencimientos;
