const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

function PagoHonorario(data) {
  this.id_honorario = data.id_honorario;
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
      return await db.PagoHonorario.findAll();
    } catch (error) {
      console.log(`Error en pagosHonorariosService: ${error}`);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.PagoHonorario.findOne({
        where: {id: id},
      });
    } catch (error) {
      console.log("Error en pagosHonorariosService.getOneByPK", error);
    }
  },

  getAllByIdHonorario: async (id) => {
    try {
      return await db.PagoHonorario.findAll({
        where: { id_honorario: id },
      })
    } catch (error) {
      console.log("Error en pagosHonorariosService.getAllByIdHonorario", error);
    }
  },

  create: async (data) => {
    try {
      return await db.PagoHonorario.create(data);
    } catch (error) {
      console.log("Error en pagosHonorariosService.create", error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.PagoHonorario.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.log("Error en pagosHonorariosService.updateByPK", error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.PagoHonorario.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.log("Error en pagosHonorariosService.deleteByPK", error);
    }
  },

  getLastPagoByIdHonorario: async (id) => {
    try {
      return await db.PagoHonorario.findOne({
        where: { id_honorario: id },
        order: [
          ["fecha_pago", "DESC"],
          ["id", "DESC"],
        ],
      });
    } catch (error) {
      console.log("Error en pagosHonorariosService.getLastPagoByIdHonorario", error);
    }
  },

  getYears: async (id) => {
      try {
        return await db.PagoHonorario.findAll({
          where: { id_servicio: id },
          attributes: [[sequelize.fn("YEAR", sequelize.col("fecha_pago")), "year"]],
          group: ["year"],
          order: [[sequelize.fn("YEAR", sequelize.col("fecha_pago")), "DESC"]],
          raw: true,
        })
      } catch (error) {
        console.log("Error en pagosHonorariosService.getYears", error);
      }
    },
  
    getPagosByYear: async (id, year) => {
      try {
        return await db.PagoHonorario.findAll({
          where: {
            id_servicio: id,
            [Op.and]: sequelize.where(sequelize.fn("YEAR", sequelize.col("fecha_pago")), year)
          },
          include: ["servicio", "forma_pago"]
        });
      } catch (error) {
        console.log("Error en pagosHonorariosService.getPagosByYear", error);
      }
    },

};