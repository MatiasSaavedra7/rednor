const { raw } = require("mysql2");
const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

function Pago(data) {
  this.id_gasto = data.id_gasto;
  this.id_forma_pago = data.id_forma_pago;
  this.entidad_bancaria = data.entidad_bancaria;
  this.nro_tarjeta = data.nro_tarjeta;
  this.cbu = data.cbu;
  this.cuit = data.cuit;
  this.divisa = data.divisa;
  this.monto = data.monto;
  this.mes = data.mes;
  this.fecha_pago = data.fecha_pago;
  this.fecha_vencimiento = data.fecha_vencimiento;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Pago.findAll({
        include: ["gasto", "forma_pago", "archivos_pagos"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Pago.findOne({
        where: { id: id },
        include: ["gasto", "forma_pago", "archivos_pagos"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Pago.update(data, {
        where: { id: id },
        include: ["gasto", "forma_pago", "archivos_pagos"]
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
        include: ["gasto", "forma_pago", "archivos_pagos"],
        raw: true,
      })
    } catch (error) {
      console.log(error);
    }
  },

  getLastPagoByIdGasto: async (id) => {
    try {
      return await db.Pago.findOne({
        where: { id_gasto: id },
        order: [["id", "DESC"]],
        limit: 1,
        include: ["gasto", "forma_pago", "archivos_pagos"],
      })
    } catch (error) {
      console.error("Error en getLastPagoByIdGasto: ", error);
      throw error; // Esto es para que el error se propague hasta el controlador
    }
  },

  getAnios: async (id) => {
    try {
      return await db.Pago.findAll({
        where: { id_gasto: id },
        attributes: [[sequelize.fn("YEAR", sequelize.col("fecha_pago")), "year"]],
        group: ["year"],
        raw: true,
      })
    } catch (error) {
      console.log(error);
    }
  },

  getPagosPorAnio: async (id, year) => {
    try {
      return await db.Pago.findAll({
        where: {
          id_gasto: id,
          [Op.and]: [ sequelize.where(sequelize.fn("YEAR", sequelize.col("fecha_pago")), year) ]
        },
        order: [["fecha_pago", "ASC"]],
      })
    } catch (error) {
      console.log(error);
    }
  },

  // getPagosPorMesAnio: async (id, year, month) => {
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }
}