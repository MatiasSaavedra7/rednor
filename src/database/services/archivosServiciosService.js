const db = require("../models");
const Op = db.Sequelize.Op;

function ArchivoServicio(data) {
  this.id_servicio = data.id_servicio;
  this.nombre = data.nombre;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.ArchivoServicio.findAll({
        include: ["servicio"]
      });
    } catch (error) {
      console.error(error);
    }
  },

  getAllByIdServicio: async (id) => {
    try {
      return await db.ArchivoServicio.findAll({
        where: { id_servicio: id },
        include: ["servicio"]
      })
    } catch (error) {
      let message = `[ERROR] Error en archivosServiciosService.getAllByIdServicio: ${error}`;
      console.error(message);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.ArchivoServicio.findOne({
        where: { id: id },
        include: ["servicio"]
      });
    } catch (error) {
      let message = `[ERROR] Error en archivosServiciosService.getOneByPK: ${error}`;
      console.error(message);
    }
  },

  create: async (data) => {
    try {
      return await db.ArchivoServicio.create(new ArchivoServicio(data));
    } catch (error) {
      let message = `[ERROR] Error en archivosServiciosService.create: ${error.message}`;
      console.error(message);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.ArchivoServicio.destroy({ where: { id: id } });
    } catch (error) {
      let message = `[ERROR] Error en archivosServiciosService.deleteByPK: ${error.message}`;
      console.error(message);
    }
  }
};