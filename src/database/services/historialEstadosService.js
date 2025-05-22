const db = require("../models");
const Op = db.Sequelize.Op;

function HistorialEstado(data) {
  this.id_equipo = data.id_equipo;
  this.id_estado_anterior = data.id_estado_anterior;
  this.id_estado_nuevo = data.id_estado_nuevo;
  this.fecha = data.fecha;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.HistorialEstado.findAll();
    } catch (error) {
      console.log(error);
    }
  },

  getOneWhere: async (id, estadoAnterior, estadoNuevo) => {
    try {
      return await db.HistorialEstado.findOne({
        where: {
          id_equipo: id,
          id_estado_anterior: estadoAnterior,
          id_estado_actual: estadoNuevo
        },
        order: [["fecha", "DESC"]],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.HistorialEstado.findByPk(id);
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.HistorialEstado.create(new HistorialEstado(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.HistorialEstado.update(data, {
        where: { id: id }
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.HistorialEstado.destroy({
        where: { id: id }
      });
    } catch (error) {
      console.log(error);
    }
  },

  findLastEstadoByIdEquipo: async (id) => {
    try {
      return await db.HistorialEstado.findOne({
        where: {
          id_equipo: id
        },
        order: [["fecha", "DESC"]],
      })
    } catch (error) {
     console.log(error); 
    }
  }
}