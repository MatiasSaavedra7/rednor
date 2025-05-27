const db = require("../models");
const Op = db.Sequelize.Op;

function TipoEquipo(data) {
  this.nombre = data.nombre;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.TipoEquipo.findAll();
    } catch (error) {
      console.log(error.message);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.TipoEquipo.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  create: async (data) => {
    try {
      return await db.TipoEquipo.create(new TipoEquipo(data));
    } catch (error) {
      console.log(error)
    }
  },

  getByName: async (name) => {
    try {
      return await db.TipoEquipo.findOne({
        where: { nombre: name },
      })
    } catch (error) {
      console.log(error);
    }
  }
};
