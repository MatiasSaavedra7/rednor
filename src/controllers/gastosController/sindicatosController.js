const formasPagoService = require('../../database/services/formasPagoService');

module.exports = {
  getAll: async (req, res) => {
    try {
      res.render("gastos/sindicatos/sindicatos")
    } catch (error) {
      res.send("Error en el servidor: " + error);
    }
  },

  getOneByPK: async (req, res) => {
    try {
      const params = req.params.id;

      res.render("gastos/sindicatos/detalles", { params });
    } catch (error) {
      res.send("Error en el servidor: " + error);
    }
  },

  create: async (req, res) => {
    try {
      const formas_pago = await formasPagoService.getAll();

      res.render("gastos/sindicatos/registro", { formas_pago });
    } catch (error) {
      res.send("Error en el servidor: " + error);
    }
  },
}