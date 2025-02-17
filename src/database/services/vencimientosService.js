const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

function Vencimiento(data) {
  this.id_cuota = data.id_cuota;
  this.fecha_vencimiento = data.fecha_vencimiento;
  this.interes_financiero = data.interes_financiero;
  this.interes_resarcitorio = data.interes_resarcitorio;
  this.total = data.total;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Vencimiento.findAll({
        include: ["cuota"]
      });
    } catch (error) {
      console.error("Service Error || Error al recuperar los vencimientos: ", error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Vencimiento.findOne({
        where: { id: id },
        include: ["cuota"]
      });
    } catch (error) {
      console.error("Service Error || Error al recuperar el vencimiento: ", error);
    }
  },

  create: async (data) => {
    try {
      return await db.Vencimiento.create(new Vencimiento(data));
    } catch (error) {
      console.error("Service Error || Error al crear el vencimiento: ", error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Vencimiento.update(data, {
        where: { id: id },
        include: ["cuota"]
      })
    } catch (error) {
      console.error("Service Error || Error al actualizar el vencimiento: ", error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Vencimiento.destroy({
        where: { id: id }
      });
    } catch (error) {
      console.error("Service Error || Error al eliminar el vencimiento: ", error);
    }
  },

  getAllByIdCuota: async (id_cuota) => {
    try {
      return await db.Vencimiento.findAll({
        where: { id_cuota: id_cuota },
        include: ["cuota"]
      });
    } catch (error) {
      console.error("Service Error || Error al recuperar los vencimientos: ", error);
    }
  },
};