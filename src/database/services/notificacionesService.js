const db = require("../models");
const Op = db.Sequelize.Op;

function Notificacion(data) {
  this.id_usuario = data.id_usuario;
  this.titulo = data.titulo;
  this.mensaje = data.mensaje;
  this.url = data.url;
  this.fecha = data.fecha;
}

module.exports = {
  create: async (data, id_usuarioEmisor) => {
    try {
      // Crear la notificacion
      const notificacion = await db.Notificacion.create(new Notificacion(data));
      
      // Obtener todos los Usuarios excepto el usuario emisor de la notificacion
      const usuarios = await db.Usuario.findAll({
        where: {
          id: {
            [Op.ne]: id_usuarioEmisor
          }
        }
      });

      // Crear notificaciones para cada Usuario
      const notificacionesUsuarios = usuarios.map((usuario) => ({
        id_usuario: usuario.id,
        id_notificacion: notificacion.id,
        leida: false,
      }));

      // Guardar en la tabla notificaciones_usuarios
      await db.NotificacionUsuario.bulkCreate(notificacionesUsuarios);

      return notificacion;
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (limit, offset) => {
    try {
      return await db.Notificacion.findAndCountAll({
        include: [
          { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"]}
        ],
        limit: limit,
        offset: offset,
        order: [["id", "DESC"]]
      });      
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Notificacion.findOneByPK(id, {
        include: [
          { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"]}
        ]
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Notificacion.update(data, {
        where: { id: id },
      })
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Notificacion.destroy({
        where: { id: id },
      })
    } catch (error) {
      console.log(error);
    }
  }
}