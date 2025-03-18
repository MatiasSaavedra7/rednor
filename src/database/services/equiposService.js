const db = require("../models");
const Op = db.Sequelize.Op;

const { Equipo } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return db.Equipo.findAll({
        include: ["estado", "tipo"],
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  //   Metodo para traer aquellos equipos cuyo estado sea Disponible (id_estado = 1)
  getAllDisponibles: async () => {
    try {
      return db.Equipo.findAll({
        include: ["estado", "tipo"],
        where: {
          id_estado: { [Op.in]: [1, 2] },
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getOneDisponible: async (id) => {
    try {
      return db.Equipo.findOne({
        include: ["estado", "tipo", "ingreso"],
        where: {
          id: id,
          id_estado: { [Op.eq]: 1 },
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getAllAlquilado: async () => {
    try {
      return db.Equipo.findAll({
        include: ["estado", "tipo"],
        where: {
          id_estado: { [Op.eq]: 2 },
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getOneAlquilado: async (id) => {
    try {
      return db.Equipo.findOne({
        include: ["estado", "tipo", "ingreso"],
        where: {
          id: id,
          id_estado: { [Op.eq]: 2 },
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getAllTaller: async () => {
    try {
      return db.Equipo.findAll({
        include: ["estado", "tipo", "ingreso"],
        where: {
          id_estado: { [Op.eq]: 3 },
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getOneTaller: async (id) => {
    try {
      return db.Equipo.findOne({
        include: ["ingreso", "tipo", "estado"],
        where: {
          id: id,
          id_estado: { [Op.eq]: 3 },
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getOneByPK: async (id) => {
    try {
      return db.Equipo.findOne({
        where: { id: id },
        include: ["estado", "tipo"],
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  create: async (data) => {
    try {
      return db.Equipo.create(new Equipo(data));
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  deleteByPK: async (id) => {
    try {
      return db.Equipo.destroy({where: {id : id}})
    } catch (error) {
      console.log(error);
    }
  },
  
  updateByPK: async (data, id) => {
    try {
      return db.Equipo.update(data, { where: { id: id } })
    } catch (error) {
      console.log(error);
    }
  }
};
