const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

function pagoACuenta(data) {
  this.id_plan_pago = data.id_plan_pago;
  this.capital = data.capital;
  this.interes_financiero = data.interes_financiero;
  this.interes_resarcitorio = data.interes_resarcitorio;
  this.total = data.total;
  this.fecha_vencimiento = data.fecha_vencimiento;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.PagoACuenta.findAll();
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.PagoACuenta.findByPk(id);
    } catch (error) {
      console.log(error);
    }
  },

  getAllByPlanPago: async (id) => {
    try {
      return await db.PagoACuenta.findAll({
        where: { id_plan_pago: id },
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.PagoACuenta.create(new pagoACuenta(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.PagoACuenta.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.PagoACuenta.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};