const db = require("../models");
const Op = db.Sequelize.Op;

const { Egreso } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Egreso.findAll({
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Egreso.findOne({
        where: { id: id },
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByIdIngreso: async (id) => {
    try {
      return await db.Egreso.findOne({
        where: { id_ingreso: id },
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Egreso.create(new Egreso(data));
    } catch (error) {
      console.log(error);
    }
  },
};
