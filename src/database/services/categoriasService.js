const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
  getAll: async () => {
    try {
      return db.Categoria.findAll({
        include: ["gasto"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return db.Categoria.findOne({
        where: { id: id },
        include: ["gasto"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Categoria.update(data, {
        where: { id: id },
        include: ["gasto"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Categoria.destroy({
        where: { id: id },
        include: ["gasto"]
      })
    } catch (error) {
      console.log(error);
    }
  }
}