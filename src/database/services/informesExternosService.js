const db = require("../models");
const Op = db.Sequelize.Op;

const { InformeExterno } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.InformeExterno.findAll({
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.InformeExterno.findOne({
        where: { id: id },
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.InformeExterno.create(new InformeExterno(data));
    } catch (error) {
      console.log(error);
    }
  },

  getAllByIdIngreso: async (id) => {
    try {
      return await db.InformeExterno.findAll({
        where: { id_ingreso_externo: id },
        // include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.InformeExterno.update(data, {
        where: { id: id },
        // include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
