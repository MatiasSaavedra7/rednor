const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

function Cuota(data) {
  this.id_plan_pago = data.id_plan_pago;
  this.nro_cuota = data.nro_cuota;
  this.capital = data.capital;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Cuota.findAll({
        include: ["plan_pago", "vencimientos"]
      });
    } catch (error) {
      console.error("Service Error || Error al recuperar las cuotas: ", error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Cuota.findOne({
        where: { id: id },
        include: ["plan_pago", "vencimientos"]
      });
    } catch (error) {
      console.error("Service Error || Error al recuperar la cuota: ", error);
    }
  },

  create: async (data) => {
    try {
      return await db.Cuota.create(new Cuota(data));
    } catch (error) {
      console.error("Service Error || Error al crear la cuota: ", error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Cuota.update(data, {
        where: { id: id },
        include: ["plan_pago", "vencimientos"]
      })
    } catch (error) {
      console.error("Service Error || Error al actualizar la cuota: ", error);
    }
  },
};