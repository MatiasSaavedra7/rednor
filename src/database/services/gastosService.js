const db = require("../models");
const Op = db.Sequelize.Op;

function Gasto(data) {
  this.id_categoria = data.id_categoria;
  this.nombre = data.nombre;
  this.descripcion = data.descripcion;
  this.condiciones = data.condiciones;
  this.dia_vencimiento = data.dia_vencimiento;
  this.frecuencia = data.frecuencia;
  this.id_forma_pago = data.id_forma_pago;
  this.entidad_bancaria = data.entidad_bancaria;
  this.cbu = data.cbu;
  this.cuit = data.cuit;
  this.nro_tarjeta = data.nro_tarjeta;
  this.divisa = data.divisa;
  this.monto = data.monto;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Gasto.findAll({
        include: ["categoria", "pago", "forma_pago"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Gasto.findOne({
        where: { id: id },
        include: ["categoria", "pago", "forma_pago"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Gasto.update(data, {
        where: { id: id },
        include: ["categoria", "pago", "forma_pago"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Gasto.create(new Gasto(data));
    } catch (error) {
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Gasto.destroy({
        where: { id: id }
      })
    } catch (error) {
      console.log(error);
    }
  },

  getAllByIdCategoria: async (id) => {
    try {
      return await db.Gasto.findAll({
        where: { id_categoria: id },
        include: ["categoria", "pago", "forma_pago"]
      })
    } catch (error) {
      console.log(error);
    }
  }
}