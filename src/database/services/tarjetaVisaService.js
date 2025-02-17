const db = require("../models");
const Op = db.Sequelize.Op;

function TarjetaVisa(data) {
  this.nombre = data.nombre;
  this.nro_tarjeta = data.nro_tarjeta;
  this.dia_vencimiento = data.dia_vencimiento;
  this.frecuencia = data.frecuencia;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.TarjetaVisa.findAll();
    } catch (error) {
      console.error("Error en tarjetaVisaService.getAll: " + error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.TarjetaVisa.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en tarjetaVisaService.getOneByPK: " + error);
    }
  },

  create: async (data) => {
    try {
      return await db.TarjetaVisa.create(new TarjetaVisa(data));
    } catch (error) {
      console.error("Error en tarjetaVisaService.create: " + error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.TarjetaVisa.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en tarjetaVisaService.updateByPK: " + error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.TarjetaVisa.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error en tarjetaVisaService.deleteByPK: " + error);
    }
  },
}