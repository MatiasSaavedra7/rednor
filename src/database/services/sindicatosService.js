const db = require("../models");
const Op = db.Sequelize.Op;

function Sindicato(data) {
  this.nombre = data.nombre;
  this.descripcion = data.descripcion;
  this.condiciones = data.condiciones;
  this.dia_vencimiento = data.dia_vencimiento;
  this.frecuencia = data.frecuencia;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Sindicato.findAll();
    } catch (error) {
      console.error("Error en sindicatosService.getAll: " + error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Sindicato.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en sindicatosService.getOneByPK: " + error);
    }
  },

  create: async (data) => {
    try {
      return await db.Sindicato.create(new Sindicato(data));
    } catch (error) {
      console.error("Error en sindicatosService.create: " + error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Sindicato.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en sindicatosService.updateByPK: " + error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Sindicato.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en sindicatosService.deleteByPK: " + error);
    }
  },
}