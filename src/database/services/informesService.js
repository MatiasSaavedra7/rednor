const db = require("../models");
const Op = db.Sequelize.Op;

const { Informe } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Informe.findAll({
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllByIdIngreso: async (id) => {
    try {
      return await db.Informe.findAll({
        include: ["ingreso"],
        where: { id_ingreso: id },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Informe.findOne({
        where: { id: id },
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Informe.create(new Informe(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (data, id) => {
    try {
      return await db.Informe.update(data, {
        where: { id: id },
      })
    } catch (error) {
      console.log(error);
      
    }
  }
};
