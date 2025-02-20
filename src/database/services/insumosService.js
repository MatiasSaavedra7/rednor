const db = require("../models");
const Op = db.Sequelize.Op;

function Insumo(data) {
  this.id_ingreso = data.id_ingreso;
  this.id_informe = data.id_informe;
  this.nro_remito = data.nro_remito;
  this.observacion = data.observacion;
  this.fecha_entrega = data.fecha_entrega;
  this.id_usuario = data.id_usuario;
};

module.exports = {
  // Metodo para traer todos los informes de insumos
  getAll: async () => {
    try {
      return await db.Insumo.findAll({
        include: ["informe", "ingreso"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para traer un informe de insumo a traves de su clave primaria
  getOneByPK: async (id) => {
    try {
      return await db.Insumo.findOne({
        where: { id: id },
        include: ["informe", "ingreso"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para traer todos los informes de insumos a traves de su id_informe
  getAllByIdInforme: async (id) => {
    try {
      return await db.Insumo.findAll({
        where: { id_informe: id },
        include: ["informe", "ingreso"]
      })
    } catch (error) {
      console.log(error);
    }

  },

  // Metodo para traer todos los informes de insumos a traves de su id_ingreso
  getAllByIdIngreso: async (idIngreso) => {
    try {
      return await db.Insumo.findAll({
        where: { id_ingreso: idIngreso },
        // include: [/*"informe", "ingreso",*/ "usuario"]
        include: [
          { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"]},
        ],
      })
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para crear un nuevo informe de insumo
  create: async (data) => {
    try {
      return await db.Insumo.create(new Insumo(data));
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para actualizar un informe de insumo a traves de si clave primaria
  updateByPK: async (data, id) => {
    try {
      await db.Insumo.update(data, { where: { id: id } });
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para eliminar un informe de insumo a traves de su clave primaria
  deleteByPK: async (id) => {
    try {
      await db.Insumo.destroy({ where: { id: id } });
    } catch (error) {
      console.log(error);
    }
  },

  // Metodos para la API
  getAllByIdIngresoAPI: async (id) => {
    try {
      return await db.Insumo.findAll({
        where: { id_ingreso: id },
        include: ["usuario"]
      })
    } catch (error) {
      let message = "[ERROR] Error en insumosService.getOneByIdIngresoAPI " + error;
      console.log(message);
    }
  }
}