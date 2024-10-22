const { where } = require("sequelize");
const db = require("../models");
const Op = db.Sequelize.Op;

const { Habilitado } = require("../utils/objects");


module.exports = {
  getAll: async () => {
    try {
      return db.Habilitado.findAll({
        include: ["cliente"],
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getOneByPK: async (id) => {
    try {
      return db.Habilitado.findOne({
        where: { id: id },
        include: ["cliente"],
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getAllByPK: async (id) => {
    try {
      return db.Habilitado.findAll({
        where: { id_cliente: id },
        include: ["cliente"],
      })
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return db.Habilitado.create(new Habilitado(data))
    } catch (error) {
      console.log();
      return [];
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Habilitado.update(data, {
        where: { id: id },
      })
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Habilitado.destroy({ where: { id: id } });
    } catch (error) {
      console.log(error);
    }
  }
};
