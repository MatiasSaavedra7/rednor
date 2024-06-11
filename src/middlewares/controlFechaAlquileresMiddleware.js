const alquileresService = require("../database/services/alquileresService");
const equiposService = require("../database/services/equiposService");

function stringToDate(dateString) {
  let year = parseInt(dateString.substring(0, 4));
  let month = parseInt(dateString.substring(5, 7));
  let day = parseInt(dateString.substring(8, 10));

  let date = new Date(year, month - 1, day);

  return date;
}

async function controlVencimientos(req, res, next) {
  let alquileres = await alquileresService.getAllActivos();

  let fechaHoy = new Date();

  for (let i = 0; i < alquileres.length; i++) {
    // let timestampFechaBaja = Date.parse(alquileres[i].fecha_baja);
    // let dateFechaBaja = new Date(timestampFechaBaja);

    let dateFechaBaja = stringToDate(alquileres[i].fecha_baja)

    if (dateFechaBaja < fechaHoy) {
      let data = {
        activo: false,
      };
      // Finalizo el alquiler
      let alquiler = await alquileresService.updateByPK(data, alquileres[i].id);
      // Actualizo el estado del equipo a Disponible
      let equipo = await equiposService.setEstadoDisponible(alquileres[i].id_equipo);
    }
  }

  next();
}

module.exports = controlVencimientos;
