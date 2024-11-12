const db = require("../models");
const Op = db.Sequelize.Op;

function ArchivoGasto(data) {
  this.id_gasto = data.id_gasto;
  this.nombre = data.nombre;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.ArchivoGasto.findAll({
        include: ["gasto"]
      })
    } catch (error) {
      console.error("Error en el metodo getAll: ", error);
      throw new Error("Ocurrió un error en la consulta de archivos de gastos");
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.ArchivoGasto.findOne({
        where: { id: id },
        include: ["gasto"]
      })
    } catch (error) {
      console.log("Error en el metodo getOneByPK: " ,error);
      throw new Error("Ocurrió un error en la consulta de archivo de gasto");
    }
  },

  create: async (data) => {
    try {
      return await db.ArchivoGasto.create(new ArchivoGasto(data));
    } catch (error) {
      console.error("Error en el metodo create: ", error);
      throw new Error("Ocurrió un error en la creación de archivo de gasto");
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.ArchivoGasto.update(data, { where: { id: id }})
    } catch (error) {
      console.error("Error en el metodo updateByPK: ",error);
      throw new Error("Ocurrió un error en la actualización de archivo de gasto");
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.ArchivoGasto.destroy({where: { id: id }})
    } catch (error) {
      console.error("Error en el metodo deleteByPK: ", error);
      throw new Error("Ocurrió un error en la eliminación de archivo de gasto");
    }
  },

  getAllByIdGasto: async (idGasto) => {
    try {
      return await db.ArchivoGasto.findAll({
        where: { id_gasto: idGasto },
        include: ["gasto"]
      })
    } catch (error) {
      console.error("Error en el metodo getAllByIdGasto: ", error);
      throw new Error("Ocurrió un error en la consulta de archivos de gastos segun id de gasto");
    }
  }
}