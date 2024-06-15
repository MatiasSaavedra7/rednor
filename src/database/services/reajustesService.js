const db = require("../models");
const Op = db.Sequelize.Op;

const { Reajuste } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return db.Reajuste.findAll({
        include: ["alquiler"],
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getAllByField: async (field) => {
    try {
      return db.Reajuste.findAll({
        include: ["alquiler"],
        where: field,
      })
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getOneByPK: async (id) => {
    try {
      return db.Reajuste.findOne({
        include: ["alquiler"],
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  create: async (data) => {
    try {
      return db.Reajuste.create(new Reajuste(data))
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};
