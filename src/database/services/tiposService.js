const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
  getAll: async () => {
    try {
      return await db.Tipo.findAll();
    } catch (error) {
      console.log(error.message);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Tipo.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
