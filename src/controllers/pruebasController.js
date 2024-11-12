const equiposService = require("../database/services/equiposService.js");

module.exports = {
  getAll: async (req, res) => {
    try {
      let equipos = await equiposService.getAll();

      if (equipos.length == 0) {
        return res.status(200).json({
          status: 200,
          message: "No hay equipos registrados",
        });
      }

      return res.status(200).json({
        status: 200,
        equipos,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: "Error al obtener los equipos",
      });
    }
  }
}