const firmasService = require("../database/services/firmasService");

module.exports = {
  getFirmas: async (req, res) => {
    try {
      const firmas = await firmasService.getAll();

      if (!firmas) {
        throw new Error("No se encontraron firmas");
      }

      return res.json(firmas);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}