const db = require("../models");
const Op = db.Sequelize.Op;

const { Usuario } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return db.Usuario.findAll({
        include: ["rol"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return db.Usuario.findOne({
        where: { id: id },
        include: ["rol"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByUser: async (user) => {
    try {
      return db.Usuario.findOne({
        where: {
          usuario: user
        }
      })
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return db.Usuario.create(new Usuario(data));
    } catch (error) {
      console.log(error);
    }
  },
};
