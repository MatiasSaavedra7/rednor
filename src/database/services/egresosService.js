const db = require("../models");
const Op = db.Sequelize.Op;

function Egreso(data) {
  this.id_ingreso = data.id_ingreso;
  this.fecha_egreso = data.fecha_egreso;
  this.detalle = data.detalle;
  this.observacion = data.observacion;
  this.costo = data.costo;
  this.id_usuario = data.id_usuario;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Egreso.findAll({
        include: ["ingreso", "forma_pago"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Egreso.findOne({
        where: { id: id },
        include: ["ingreso", "forma_pago"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByIdIngreso: async (id) => {
    try {
      return await db.Egreso.findOne({
        where: { id_ingreso: id },
        include: [/*"ingreso",*/ "forma_pago", "usuario"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Egreso.create(new Egreso(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (data, id) => {
    try {
      return await db.Egreso.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Metodos para la API
  getOneByIdIngresoAPI: async (id) => {
    try {
      return await db.Egreso.findOne({
        where: { id_ingreso: id },
        // include: ["forma_pago", "usuario"],
        include: [
          { model: db.FormaPago, as: "forma_pago" },
          { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"] },
        ]
      })
    } catch (error) {
      let message = "[ERROR] Error en egresosService.getOneByIdIngresoAPI " + error;
      console.log(message);
    }
  }
};
