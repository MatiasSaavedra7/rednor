const db = require("../models");
const Op = db.Sequelize.Op;

const { EgresoExterno } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.EgresoExterno.findAll({
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.EgresoExterno.findOne({
        where: { id: id },
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByIdIngreso: async (id) => {
    try {
      return await db.EgresoExterno.findOne({
        where: { id_ingreso_externo: id },
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.EgresoExterno.create(new EgresoExterno(data));
    } catch (error) {
      console.log(error);
    }
  },
};
