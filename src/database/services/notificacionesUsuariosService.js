const db = require("../models");
const Op = db.Sequelize.Op;

function NotificacionUsuario(data) {
  this.id_usuario = data.id_usuario;
  this.id_notificacion = data.id_notificacion;
  this.leida = data.leida;
};

module.exports = {
  create: async (data) => {
    try {
      return await db.NotificacionUsuario.create(new NotificacionUsuario(data))      
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async () => {
    try {
      return await db.NotificacionUsuario.findAll();      
    } catch (error) {
      console.log(error);
    }
  },

  getAllNoLeidasByIdUsuario: async (id) => {
    try {
      return await db.NotificacionUsuario.findAll({
        where: {
          id_usuario: id,
          leida: 0,
        },
        include: [
          { model: db.Notificacion, as: "notificacion", include: [
            { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"]}
          ] },
        ],
      })      
    } catch (error) {
      console.log(error);
    }
  },

  update: async (data, idNotificacion, idUsuario) => {
    try {
      return await db.NotificacionUsuario.update(data, {
        where: {
          id_notificacion: idNotificacion,
          id_usuario: idUsuario,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}