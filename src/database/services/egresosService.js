const db = require("../models");
const Op = db.Sequelize.Op;

const { Egreso } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Egreso.findAll({
        include: ["ingreso", "forma_pago"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Egreso.findOne({
        where: { id: id },
        include: ["ingreso", "forma_pago"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByIdIngreso: async (id) => {
    try {
      return await db.Egreso.findOne({
        where: { id_ingreso: id },
        include: ["ingreso", "forma_pago"],
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

  updateByPK: async (data, id) => {
    try {
      return await db.Egreso.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Metodos para la API
  getOneByIdIngresoAPI: async (id) => {
    try {
      return await db.Egreso.findOne({
        where: { id_ingreso: id },
        include: ["forma_pago"],
      })
    } catch (error) {
      let message = "[ERROR] Error en egresosService.getOneByIdIngresoAPI " + error;
      console.log(message);
    }
  }
};
