const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
  getAll: async () => {
    try {
      return await db.FormaPago.findAll({
        include: ["egreso", "egreso_externo", "pago"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.FormaPago.findOne({
        where: { id: id },
        include: ["egreso", "egreso_externo", "pago"]
      });
    } catch (error) {
      console.log(error);
    }
  },
};
