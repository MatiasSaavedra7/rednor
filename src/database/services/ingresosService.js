const db = require("../models");
const Op = db.Sequelize.Op;

const { Ingreso } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Ingreso.findAll({
        include: ["equipo", "egreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Ingreso.findOne({
        where: { id: id },
        include: ["equipo", "egreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Ingreso.create(new Ingreso(data));
    } catch (error) {
      console.log(error);
    }
  },
};
