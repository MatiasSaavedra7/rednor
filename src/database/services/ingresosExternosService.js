const db = require("../models");
const Op = db.Sequelize.Op;

const { IngresoExterno } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.IngresoExterno.findAll({
        include: ["egreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.IngresoExterno.findOne({
        where: { id: id },
        include: ["egreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.IngresoExterno.create(new IngresoExterno(data));
    } catch (error) {
      console.log(error);
    }
  },
};
