const db = require("../models");
const Op = db.Sequelize.Op;

function Usuario(data) {
  this.nombre = data.nombre;
  this.apellido = data.apellido;
  this.email = data.email;
  this.password = data.password;
  this.id_rol = data.id_rol;
}

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

  getOneByEmail: async (unEmail) => {
    try {
      return db.Usuario.findOne({
        where: {
          email: unEmail
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

  updateByPK: async (id, data) => {
    try {
      return db.Usuario.update(data, {
        where: { id: id },
      })
    } catch (error) {
      console.log(error);
    }
  },

  update: async function(data, email) {
    try {
      return db.Usuario.update(data, {
        where: {
          email: email
        }
      })
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return db.Usuario.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
