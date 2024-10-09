const usuariosService = require("../database/services/usuariosService");
const rolesService = require("../database/services/rolesService")

module.exports = {
  getAll: async (req, res) => {
    try {
      let usuarios = await usuariosService.getAll();
      let roles = await rolesService.getAll();
      res.render("admin/usuarios", { usuarios, roles });
    } catch (error) {
      console.log(error);
    }
  },

  asignarRol: async (req, res) => {
    const {userId, id_rol} = req.body;
    console.log("ID del usuario: ", userId);
    console.log("ID del nuevo rol del usuario: ", id_rol);
    
    try {
      await usuariosService.updateByPK(userId, {id_rol : id_rol});
      res.redirect("/admin/usuarios");
    } catch (error) {
      console.log(error);
    }
  }
}