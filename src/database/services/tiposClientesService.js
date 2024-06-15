const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
  getAll: async () => {
    try {
      return await db.TipoCliente.findAll();
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.TipoCliente.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
