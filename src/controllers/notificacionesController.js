const notificacionesService = require("../database/services/notificacionesService");

const notificacionesUsuariosService = require("../database/services/notificacionesUsuariosService");

module.exports = {
  setSocket: (socketIoInstance) => {
    io = socketIoInstance;
  },

  getAll: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;  // Por defecto, 10 registros por pagina
      const offset = parseInt(req.query.offset) || 0; // Empezar desde el primer registro
      const result = await notificacionesService.getAll(limit, offset);

      res.json({
        totalRecords: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        notifications: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllNoLeidas: async (req, res) => {
    try {
      // Obtener el Usuario loggeado.
      const usuario = req.session.userLogged;

      // Obtener todas las notificaciones del Usuario No Leidas
      const notificaciones = await notificacionesUsuariosService.getAllNoLeidasByIdUsuario(usuario.id);
      
      res.json(notificaciones);
    } catch (error) {
      console.log(error);
      
    }
  },

  create: async (req, res) => {
    try {
      // Obtener la Informacion del Usuario
      const usuario = req.session.userLogged;

      // Crear la notificacion, y pasar el ID del Usuario que la emite.
      const nuevaNotificacion = await notificacionesService.create(req.body, usuario.id);

      res.json({message: "Notificación creada", data: nuevaNotificacion});
    } catch (error) {
      console.log(error);
    }
  },

  marcarLeida: async (req, res) => {
    try {
      // Capturar el ID de la Notificacion
      const idNotificacion = req.params.id;

      // Obtener la informacion del Usuario loggeado.
      const usuario = req.session.userLogged;
      
      // await notificacionesService.updateByPK(idNotificacion, { leida: true });

      await notificacionesUsuariosService.update({ leida: true }, idNotificacion, usuario.id)

      res.json({ message: "Notificación marcada como leída" });
    } catch (error) {
      console.log(error);
    }
  }
}

/*
const getAll = async (req, res) => {
  try {
    const notificaciones = await notificacionesService.getAll();
    res.json(notificaciones);
  } catch (error) {
    console.log(error);
  }
} 

const crearNotificacion = async (req, res) => {
  try {
    const nuevaNotificacion = await notificacionesService.create(req.body);
    io.emit("nuevaNotificacion", nuevaNotificacion);
  } catch (error) {
    console.log(error);
  }
}
*/

// module.exports = { setSocket, crearNotificacion };