const db = require("../models");
const Op = db.Sequelize.Op;

function ArchivoPago(data) {
  this.id_pago = data.id_pago;
  this.nombre = data.nombre;
};

module.exports = {
  getAll: async () => {
    try {
      return await db.ArchivoPago.findAll({
        include: ["pago"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.ArchivoPago.findOne({
        where: { id: id },
        include: ["pago"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.ArchivoPago.create(new ArchivoPago(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.ArchivoPago.update(data, { where: { id: id }})
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.ArchivoPago.destroy({where: { id: id }})
    } catch (error) {
      console.log(error);
    }
  },

  getAllByIdPago: async (idPago) => {
    try {
      return await db.ArchivoPago.findAll({
        where: { id_pago: idPago },
        include: ["pago"]
      })
    } catch (error) {
      console.log(error);
    }
  } 
}