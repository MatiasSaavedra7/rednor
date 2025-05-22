const equiposService = require("../database/services/equiposService.js");
const bcryptjs = require("bcryptjs");
const usuariosService = require("../database/services/usuariosService.js");

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
  },

  newPassword: async function(req, res) {
    try {
      let newPassword = "Puma05"

      const hash = await bcryptjs.hash(newPassword, 10);
      
      console.log(hash);

      res.status(200).json({ message: "Nuevo hash creado", hash: hash });
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}