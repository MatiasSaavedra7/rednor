const db = require("../models");
const Op = db.Sequelize.Op;

const { Alquiler } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Alquiler.findAll({
        include: ["cliente", "equipo", "firma"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Alquiler.findOne({
        where: { id: id },
        include: ["cliente", "equipo", "firma"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Alquiler.create(new Alquiler(data));
    } catch (error) {
      console.log(error);
      res.status(500).send("Something broke");
    }
  },
};
