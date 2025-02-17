const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

function PagoCuota(data) {
  this.id_plan = data.id_plan;
  this.id_forma_pago = data.id_forma_pago;
  this.entidad_bancaria = data.entidad_bancaria;
  this.cbu = data.cbu;
  this.cuit = data.cuit;
  this.divisa = data.divisa;
  this.monto = data.monto;
  this.fecha_pago = data.fecha_pago;
  this.fecha_vencimiento = data.fecha_vencimiento;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.PagoCuota.findAll();
    } catch (error) {
      console.log(`Error en pagosCuotasService: ${error}`);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.PagoCuota.findOne({
        where: {id: id},
      });
    } catch (error) {
      console.log("Error en pagosCuotasService.getOneByPK", error);
    }
  },

  getAllByPlanPago: async (id) => {
    try {
      return await db.PagoCuota.findAll({
        where: { id_plan: id },
      })
    } catch (error) {
      console.log("Error en pagosCuotasService.getAllByPlanPago", error);
    }
  },

  create: async (data) => {
    try {
      return await db.PagoCuota.create(data);
    } catch (error) {
      console.log("Error en pagosCuotasService.create", error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.PagoCuota.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.log("Error en pagosCuotasService.updateByPK", error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.PagoCuota.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.log("Error en pagosCuotasService.deleteByPK", error);
    }
  },

};