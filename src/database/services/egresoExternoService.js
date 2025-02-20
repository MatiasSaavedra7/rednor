const db = require("../models");
const Op = db.Sequelize.Op;

function EgresoExterno(data) {
  this.id_ingreso_externo = data.id_ingreso_externo;
  this.detalle = data.detalle;
  this.precio = data.precio;
  this.id_forma_pago = data.id_forma_pago;
  this.fecha_cobro = data.fecha_cobro;
  this.fecha_egreso = data.fecha_egreso;
  this.id_usuario = data.id_usuario;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.EgresoExterno.findAll({
        include: ["ingreso", "forma_pago"],
        order: [["id", "DESC"]],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.EgresoExterno.findOne({
        where: { id: id },
        include: ["ingreso", "forma_pago"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByIdIngreso: async (id) => {
    try {
      return await db.EgresoExterno.findOne({
        where: { id_ingreso_externo: id },
        include: [
          { model: db.FormaPago, as: "forma_pago"},
          { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"] },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.EgresoExterno.create(new EgresoExterno(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.EgresoExterno.update(data, {
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
