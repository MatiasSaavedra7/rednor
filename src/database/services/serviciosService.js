const db = require("../models");
const Op = db.Sequelize.Op;

function Servicio(data) {
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
      return await db.Servicio.findAll({
        // include: ["pagos_servicios"],
      });
    } catch (error) {
      console.error("[ERROR]: Error en serviciosService.getAll: " + error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Servicio.findOne({
        where: { id: id },
        include: ["archivos_servicio"],
        // raw: true,
      });
    } catch (error) {
      console.error("\n\n%c[ERROR]: Error en serviciosService.getOneByPK:" + error + "\n\n");
    }
  },

  create: async (data) => {
    try {
      return await db.Servicio.create(new Servicio(data));
    } catch (error) {
      console.error("[ERROR]: Error en serviciosService.create: " + error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Servicio.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.error("[ERROR]: Error en serviciosService.updateByPK: " + error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Servicio.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.error("\n\n[ERROR]: Error en serviciosService.deleteByPK: " + error);
    }
  },
}