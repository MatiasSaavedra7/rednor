const db = require("../models");
const Op = db.Sequelize.Op;

const { IngresoExterno } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.IngresoExterno.findAll({
        include: ["egreso", "estado"],
        order: [["id", "DESC"]],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.IngresoExterno.findOne({
        where: { id: id },
        include: ["egreso", "estado"],
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

  updateByPK: async (id, data) => {
    try {
      return await db.IngresoExterno.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
