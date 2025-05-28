const db = require("../models");
const Op = db.Sequelize.Op;

function EquipoExterno(data) {
  this.marca = data.marca;
  this.modelo = data.modelo;
  this.numero_serie = data.numero_serie;
  this.id_tipo_equipo = data.id_tipo_equipo;
}

module.exports = {
  getOneByPK: async (id) => {
    try {
      return await db.EquipoExterno.findOne({
        where: { id: id },
        include: ["ingreso", "tipo"],
      });
    } catch (error) {
      let message = `\n\n[ERROR] No se pudo obtener el equipo externo: ${error}\n\n`;
      console.log(message);
    }
  },

  getAll: async () => {
    try {
      return await db.EquipoExterno.findAll({
        include: ["tipo"],
      });
    } catch (error) {
      let message = `\n\n[ERROR] No se pudieron obtener los equipos externos: ${error}\n\n`;
      console.log(message);
    }
  },

  create: async (data) => {
    try {
      return await db.EquipoExterno.create(new EquipoExterno(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.EquipoExterno.update(data, {
        where: { id: id },
      });
    } catch (error) {
      let message = `\n\n[ERROR] Error en equiposExternosService.updateByPK. No se pudo actualizar el equipo externo: ${error}\n\n`;
      console.log(message);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.EquipoExterno.destroy({
        where: { id: id },
      })
    } catch (error) {
      let message = `\n\n[ERROR] No se pudo eliminar el equipo externo: ${error}\n\n`;
      console.log(message);
      
    }
  }
};
