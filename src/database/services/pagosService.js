const db = require("../models");
const Op = db.Sequelize.Op;

function Pago(data) {
  this.id_gasto = data.id_gasto;
  this.id_forma_pago = data.id_forma_pago;
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
      return await db.Pago.findAll({
        include: ["gasto", "forma_pago"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Pago.findOne({
        where: { id: id },
        include: ["gasto", "forma_pago"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Pago.update(data, {
        where: { id: id },
        include: ["gasto", "forma_pago"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Pago.create(new Pago(data));
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Pago.destroy({
        where: { id: id }
      })
    } catch (error) {
      console.log(error);
    }
  },

  getAllByIdGasto: async (id) => {
    try {
      return await db.Pago.findAll({
        where: { id_gasto: id },
        include: ["gasto", "forma_pago"],
      })
    } catch (error) {
      console.log(error);
    }
  },

  getLastByIdGasto: async (id) => {
    try {
      return await db.Pago.findOne({
        where: { id_gasto: id },
        order: [["id", "DESC"]],
        include: ["gasto", "forma_pago"],
      })
    } catch (error) {
      
    }
  }
}