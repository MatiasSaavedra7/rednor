const usuariosService = require("../database/services/usuariosService");

module.exports = {
  getAll: async (req, res) => {
    try {
      let usuarios = await usuariosService.getAll();
      res.render("admin/usuarios", { usuarios });
    } catch (error) {
      console.log(error);
    }
  }
}