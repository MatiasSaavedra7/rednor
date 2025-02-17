const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

function PagoServicio(data) {
  this.id_servicio = data.id_servicio;
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
      return await db.PagoServicio.findAll({
        include: ["servicio", "forma_pago"]
      });
    } catch (error) {
      console.log("\n\n [ERROR]: Error en pagosServiciosService.getAll: " + error + "\n\n");
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.PagoServicio.findOne({
        where: { id: id },
        include: ["servicio", "forma_pago", "archivos"]
      });
    } catch (error) {
      console.log("\n\n [ERROR]: Error en pagosServiciosService.getOneByPK: " + error + "\n\n");
    }
  },

  create: async (data) => {
    try {
      return await db.PagoServicio.create(new PagoServicio(data));
    } catch (error) {
      console.log("\n\n [ERROR]: Error en pagosServiciosService.create: " + error + "\n\n");
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.PagoServicio.update(data, {
        where: { id: id },
        include: ["servicio", "forma_pago"]
      });
    } catch (error) {
      console.log("\n\n [ERROR]: Error en pagosServiciosService.updateByPK: " + error + "\n\n");
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.PagoServicio.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.log("\n\n [ERROR]: Error en pagosServiciosService.deleteByPK: " + error + "\n\n");
    }
  },

  getPagosByIdServicio: async (id) => {
    try {
      return await db.PagoServicio.findAll({
        where: { id_servicio: id },
        include: ["servicio", "forma_pago", "archivos"]
      });
    } catch (error) {
      console.log("\n\n [ERROR]: Error en pagosServiciosService.getPagosByIdServicio: " + error + "\n\n");
    }
  },

  getLastPagoByIdServicio: async (id) => {
    try {
      return await db.PagoServicio.findOne({
        where: { id_servicio: id },
        include: ["servicio", "forma_pago", "archivos"],
        order: [
          ["fecha_pago", "DESC"],
          ["id", "DESC"]
        ],
      });
    } catch (error) {
      console.log("\n\n [ERROR]: Error en pagosServiciosService.getLastPago: " + error + "\n\n");
    }
  },

  getYears: async (id) => {
    try {
      return await db.PagoServicio.findAll({
        where: { id_servicio: id },
        attributes: [[sequelize.fn("YEAR", sequelize.col("fecha_pago")), "year"]],
        group: ["year"],
        order: [[sequelize.fn("YEAR", sequelize.col("fecha_pago")), "DESC"]],
        raw: true,
      })
    } catch (error) {
      console.error("\n\n [ERROR]: Error en pagosServiciosService.getYears: " + error + "\n\n");
    }
  },

  getPagosByYear: async (id, year) => {
    try {
      return await db.PagoServicio.findAll({
        where: {
          id_servicio: id,
          [Op.and]: sequelize.where(sequelize.fn("YEAR", sequelize.col("fecha_pago")), year)
        },
        include: ["servicio", "forma_pago"]
      });
    } catch (error) {
      console.error("\n\n [ERROR]: Error en pagosServiciosService.getPagosByYear: " + error + "\n\n");
    }
  },
}