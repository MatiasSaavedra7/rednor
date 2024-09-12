const db = require("../models");
const Op = db.Sequelize.Op;

const { Ingreso } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Ingreso.findAll({
        include: ["equipo", "egreso", "estado"],
        // group: ["id_equipo"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Ingreso.findOne({
        where: { id: id },
        include: ["equipo", "egreso", "estado"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllByIdEquipo: async (id) => {
    try {
      return await db.Ingreso.findAll({
        where: { id_equipo: id },
        include: ["equipo", "egreso", "estado"],
      })
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

  updateByPK: async (data, id) => {
    try {
      return await db.Ingreso.update(data, {
        where: { id: id },
      })
    } catch (error) {
      console.log(error);
    }
  },
};
