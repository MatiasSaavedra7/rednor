const db = require("../models");
const Op = db.Sequelize.Op;

const { Reajuste } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return db.Reajuste.findAll({
        include: ["alquiler"],
        order: [["id", "DESC"]]
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getAllByIdAlquiler: async (id) => {
    try {
      return db.Reajuste.findAll({
        include: ["alquiler"],
        order: [["id", "DESC"]],
        where: { id_alquiler: id },
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
  },

  deleteByPK: async (id) => {
    try {
      return db.Reajuste.destroy({
        where: { id: id },
      })
    } catch (error) {
      console.log(error);
    }
  }
};
