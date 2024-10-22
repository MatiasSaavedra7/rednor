const db = require("../models");
const Op = db.Sequelize.Op;

const { Cliente } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return await db.Cliente.findAll({
        include: ["tipo"],
      });
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Cliente.findOne({
        where: { id: id },
        include: ["tipo"],
      });
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  create: async (data, id) => {
    try {
      return await db.Cliente.create(new Cliente(data));
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  updateByPK: async (data, id) => {
    try {
      return await db.Cliente.update(data, {
        where: { id: id }
      })
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Cliente.destroy({ where : { id: id } });
    } catch (error) {
      console.log(error);
    }
  }
};
