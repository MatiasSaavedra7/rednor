const db = require("../models");
const Op = db.Sequelize.Op;

function Impuesto(data) {
  this.tipo = data.tipo;
  this.nombre = data.nombre;
  this.descripcion = data.descripcion;
  this.condiciones = data.condiciones;
  this.dia_vencimiento = data.dia_vencimiento;
  this.frecuencia = data.frecuencia;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Impuesto.findAll();
    } catch (error) {
      console.error("Error en impuestosService.getAll: " + error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Impuesto.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en impuestosService.getOneByPK: " + error);
    }
  },

  create: async (data) => {
    try {
      return await db.Impuesto.create(new Impuesto(data));
    } catch (error) {
      console.error("Error en impuestosService.create: " + error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Impuesto.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en impuestosService.updateByPK: " + error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Impuesto.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en impuestosService.deleteByPK: " + error);
    }
  },
}