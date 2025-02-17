const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

function Plan(data) {
  this.nro_plan = data.nro_plan;
  this.nombre = data.nombre;
  this.cuit = data.cuit;
  this.cbu = data.cbu;
  this.fecha_consolidacion = data.fecha_consolidacion;
  this.cantidad_cuotas = data.cantidad_cuotas;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Plan.findAll({
        /*include: [
          {
            model: db.Cuota,
            as: "cuotas",
            include: [
              {
                model: db.Vencimiento,
                as: "vencimientos"
              }
            ]
          }
        ]*/
      });
    } catch (error) {
      console.error(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Plan.findOne({
        where: { id: id },
        include: [
          {
            model: db.Cuota,
            as: "cuotas",
            include: [
              {
                model: db.Vencimiento,
                as: "vencimientos"
              }
            ]
          },
          {
            model: db.PagoACuenta,
            as: "pagos_a_cuenta"
          }
        ]
      });
    } catch (error) {
      console.error(error);
    }
  },
  
  create: async (data) => {
    try {
      return await db.Plan.create(new Plan(data));
    } catch (error) {
      console.error(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Plan.update(data, {
        where: { id: id },
        include: ["cuotas"]
      })
    } catch (error) {
      console.error(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Plan.destroy({
        where: { id: id }
      });
    } catch (error) {
      console.error(error);
    }
  },

}