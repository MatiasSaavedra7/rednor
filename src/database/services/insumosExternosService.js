const db = require("../models");
const Op = db.Sequelize.Op;

function InsumoExterno(data) {
  this.id_ingreso_externo = data.id_ingreso_externo;
  this.id_informe_externo = data.id_informe_externo;
  this.nro_remito = data.nro_remito;
  this.observacion = data.observacion;
  this.fecha_entrega = data.fecha_entrega;
  this.id_usuario = data.id_usuario;
}

module.exports = {
  // Metodo para traer todos los informes de insumos
  getAll: async () => {
    try {
      return await db.InsumoExterno.findAll({
        include: ["informe"]
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para traer un informe de insumo a traves de su clave primaria
  getOneByPK: async (id) => {
    try {
      return await db.InsumoExterno.findOne({
        where: { id: id },
        include: ["informe"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para traer todos los informes de insumos a traves de su id_informe
  getAllByIdIngreso: async (id) => {
    try {
      return await db.InsumoExterno.findAll({
        where: { id_ingreso_externo: id },
        include: [
          { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"] }
        ]
      })
    } catch (error) {
      console.log(error);
    }
  },

  getOneByIdInforme: async (id) => {
    try {
      return await db.InsumoExterno.findOne({
        where: { id_informe_externo: id },
      })      
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para crear un nuevo informe de insumo
  create: async (data) => {
    try {
      return await db.InsumoExterno.create(new InsumoExterno(data));
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para actualizar un informe de insumo a traves de si clave primaria
  updateByPK: async (data, id) => {
    try {
      await db.InsumoExterno.update(data, { where: { id: id } });
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para eliminar un informe de insumo a traves de su clave primaria
  deleteByPK: async (id) => {
    try {
      await db.InsumoExterno.destroy({ where: { id: id } });
    } catch (error) {
      console.log(error);
    }
  },
}