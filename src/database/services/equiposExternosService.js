const db = require("../models");
const Op = db.Sequelize.Op;

const { EquipoExterno } = require("../utils/objects");

module.exports = {
  getOneByPK: async (id) => {
    try {
      return await db.EquipoExterno.findOne({
        where: { id: id },
        include: ["ingreso", "tipo"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async () => {
    try {
      return await db.EquipoExterno.findAll({
        include: ["ingreso", "tipo"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.EquipoExterno.create(new EquipoExterno(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.EquipoExterno.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
