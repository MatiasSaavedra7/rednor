const db = require("../models");
const Op = db.Sequelize.Op;

const { Cartucho } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Cartucho.findAll({
        include: ["categoria_cartucho"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Cartucho.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Cartucho.create(new Cartucho(data));
    } catch (error) {
      console.log(error);
    }
  }
};
