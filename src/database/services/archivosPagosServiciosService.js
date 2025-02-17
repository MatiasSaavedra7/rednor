const db = require("../models");
const Op = db.Sequelize.Op;

function ArchivoPagoServicio(data) {
  this.id_pago_servicio = data.id_pago_servicio;
  this.nombre = data.nombre;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.ArchivoPagoServicio.findAll({
        include: ["servicio"]
      });
    } catch (error) {
      let message = `Error en la consulta de archivos de pagos de servicios: ${error}`;
      console.error(message);
    }
  },

  getAllByIdPagoServicio: async (id) => {
    try {
      return await db.ArchivoPagoServicio.findAll({
        where: { id_pago_servicio: id },
        include: ["servicio"]
      })
    } catch (error) {
      let message = `Error en la consulta de archivos de pagos de servicios por ID de pago: ${error}`;
      console.error(message);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.ArchivoPagoServicio.findByPk(id, {
        // include: ["servicio"]
      });
    } catch (error) {
      let message = `Error en la consulta de un archivo de pago de servicio por ID: ${error}`;
      console.error(message);
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.ArchivoPagoServicio.create(new ArchivoPagoServicio(data));
    } catch (error) {
      let message = `Error al crear un archivo de pago de servicio: ${error}`;
      console.error(message);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.ArchivoPagoServicio.update(data, { where: { id: id } });
    } catch (error) {
      let message = `Error al actualizar un archivo de pago de servicio por ID: ${error}`;
      console.error(message);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.ArchivoPagoServicio.destroy({ where: { id: id } });
    } catch (error) {
      let message = `Error al eliminar un archivo de pago de servicio por ID: ${error}`;
      console.error(message);
    }
  },
};