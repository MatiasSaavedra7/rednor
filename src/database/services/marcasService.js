const db = require("../models");
const Op = db.Sequelize.Op;

function Marca(data) {
  this.nombre = data.nombre;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Marca.findAll();
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Marca.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Marca.create(new Marca(data));
    } catch (error) {
      console.log(error);
    }
  }
};
