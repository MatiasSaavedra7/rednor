const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
  getAll: async () => {
    try {
      return await db.Firma.findAll();
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Firma.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
