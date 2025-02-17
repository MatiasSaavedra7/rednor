const db = require("../models");
const Op = db.Sequelize.Op;

function Honorario (data) {
  this.nombre = data.nombre;
  this.descripcion = data.descripcion;
  this.condiciones = data.condiciones;
  this.dia_vencimiento = data.dia_vencimiento;
  this.frecuencia = data.frecuencia;
  this.email = data.email;
  this.telefono = data.telefono;
}


module.exports = {
  getAll: async () => {
    try {
      return await db.Honorario.findAll();
    } catch (error) {
      console.error(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Honorario.findOne({
        where: { id: id },
        include: ["archivos"],
      })
    } catch (error) {
      console.error(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Honorario.create(new Honorario(data));
    } catch (error) {
      console.error(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Honorario.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.error(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Honorario.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.error(error);
    }
  }

}