const db = require("../models");
const Op = db.Sequelize.Op;

function ArchivoHonorario(data) {
  this.id_honorario = data.id_honorario;
  this.nombre = data.nombre;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.ArchivoHonorario.findAll();
    } catch (error) {
      console.log(`Error en archivosHonorariosService: ${error}`);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.ArchivoHonorario.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(`Error en archivosHonorariosService: ${error}`);
    }
  },

  getAllByIdHonorario: async (id) => {
    try {
      return await db.ArchivoHonorario.findAll({
        where: { id_honorario: id },
      });
    } catch (error) {
      console.log(`Error en archivosHonorariosService: ${error}`);
    }
  },

  create: async (data) => {
    try {
      return await db.ArchivoHonorario.create(new ArchivoHonorario(data));
    } catch (error) {
      console.log(`Error en archivosHonorariosService: ${error}`);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.ArchivoHonorario.destroy({ where: { id: id } });
    } catch (error) {
      console.log(`Error en archivosHonorariosService: ${error}`);
    }
  },
};