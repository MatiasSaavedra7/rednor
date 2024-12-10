const db = require("../models");
const Op = db.Sequelize.Op;

const { Ingreso } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Ingreso.findAll({
        include: ["equipo", "egreso", "estado", "informes", "insumos"],
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
        include: ["equipo", "egreso", "estado", "informes", "insumos"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByIdEquipo: async (id) => {
    try {
      return await db.Ingreso.findOne({
        where: { id_equipo: id },
        order: [["fecha_ingreso", "DESC"]],
        limit: 1,
        include: ["equipo", "egreso", "estado", "informes", "insumos"],
      })
    } catch (error) {
      console.log("[ERROR] Error en ingresosService.getOneByIdEquipo " + error);
      
    }
  },

  getAllByIdEquipo: async (id) => {
    try {
      return await db.Ingreso.findAll({
        where: { id_equipo: id },
        include: ["equipo", "egreso", "estado", "informes", "insumos"],
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

  updateByPK: async (id, data) => {
    try {
      return await db.Ingreso.update(data, {
        where: { id: id },
      })
    } catch (error) {
      let message = `[ERROR] Error en ingresosService.updateByPK: ${error}`;
      console.log(message);
    }
  },
};
