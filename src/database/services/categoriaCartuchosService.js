const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
  getAll: async () => {
    try {
      return await db.CategoriaCartucho.findAll();
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.CategoriaCartucho.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
