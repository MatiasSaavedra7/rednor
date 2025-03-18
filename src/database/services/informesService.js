const db = require("../models");
const Op = db.Sequelize.Op;

function Informe(data) {
  this.id_ingreso = data.id_ingreso;
  this.detalle = data.detalle;
  this.pedido_insumos = data.pedido_insumos;
  this.fecha_informe = data.fecha_informe;
  this.id_usuario = data.id_usuario;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Informe.findAll({
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllByIdIngreso: async (id) => {
    try {
      return await db.Informe.findAll({
        // include: [/*"ingreso"*/ "usuario"],
        include: [
          { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"] },
        ],
        where: { id_ingreso: id },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Informe.findOne({
        where: { id: id },
        include: ["ingreso"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Informe.create(new Informe(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Informe.update(data, {
        where: { id: id },
      })
    } catch (error) {
      console.log(error);
      
    }
  },

  // Metodos para la API
  getAllByIdIngresoAPI: async (id) => {
    try {
      return await db.Informe.findAll({
        where: { id_ingreso: id },
        include: ["usuario"],
      })
    } catch (error) {
      let message = `[ERROR] Error en informesService.getAllByIdIngresoAPI: ${error}`;
      console.log(message);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Informe.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
