const db = require("../models");
const Op = db.Sequelize.Op;

function ArchivoPagoHonorario(data) {
  this.id_pago_honorario = data.id_pago_honorario;
  this.nombre = data.nombre;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.ArchivoPagoHonorario.findAll({});
    } catch (error) {
      console.error(`Error en archivosPagosHonorariosService.getAll: ${error}`);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.ArchivoPagoHonorario.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.error(`Error en archivosPagosHonorariosService.getOneByPK: ${error}`);
    }
  },

  getAllByIdPagoHonorario: async (id) => {
    try {
      return await db.ArchivoPagoHonorario.findAll({
        where: { id_pago_honorario: id },
      });
    } catch (error) {
      console.error(`Error en archivosPagosHonorariosService.getAllByIdPagoHonorario: ${error}`);
    }
  },

  create: async (data) => {
    try {
      return await db.ArchivoPagoHonorario.create(new ArchivoPagoHonorario(data));
    } catch (error) {
      console.error(`Error en archivosPagosHonorariosService.create: ${error}`);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.ArchivoPagoHonorario.destroy({ where: { id: id } });
    } catch (error) {
      console.error(`Error en archivosPagosHonorariosService.deleteByPK: ${error}`);
    }
  }
};