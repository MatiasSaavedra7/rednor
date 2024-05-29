const db = require("../models");
const Op = db.Sequelize.Op;

const { Equipo } = require("../utils/objects");

module.exports = {
  getAll: async () => {
    try {
      return db.Equipo.findAll({
        include: ["estado"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  //   Metodo para traer aquellos equipos cuyo estado sea Disponible (id_estado = 1)
  getAllDisponibles: async () => {
    try {
      return db.Equipo.findAll({
        include: ["estado"],
        where: {
          id_estado: { [Op.eq]: 1 },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneDisponible: async (id) => {
    try {
      return db.Equipo.findOne({
        include: ["estado", "ingreso"],
        where: {
          id: id,
          id_estado: { [Op.eq]: 1 },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllAlquilado: async () => {
    try {
      return db.Equipo.findAll({
        include: ["estado"],
        where: {
          id_estado: { [Op.eq]: 2 },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneAlquilado: async (id) => {
    try {
      return db.Equipo.findOne({
        include: ["estado", "ingreso"],
        where: {
          id: id,
          id_estado: { [Op.eq]: 2 },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllTaller: async () => {
    try {
      return db.Equipo.findAll({
        include: ["estado", "ingreso"],
        where: {
          id_estado: { [Op.eq]: 3 },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneTaller: async (id) => {
    try {
      return db.Equipo.findOne({
        include: ["ingreso", "estado"],
        where: {
          id: id,
          id_estado: { [Op.eq]: 3 },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return db.Equipo.findOne({
        where: { id: id },
        include: ["estado"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return db.Equipo.create(new Equipo(data));
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA ACTUALIZAR A EL ESTADO DE UN EQUIPO A DISPONIBLE
  setEstadoDisponible: async (id) => {
    try {
      return db.Equipo.update(
        {
          id_estado: 1,
        },
        {
          where: { id: id },
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA ACTUALIZAR A EL ESTADO DE UN EQUIPO A ALQUILADO
  setEstadoAlquilado: async (id) => {
    try {
      return db.Equipo.update(
        {
          id_estado: 2,
        },
        {
          where: { id: id },
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA ACTUALIZAR A EL ESTADO DE UN EQUIPO A EN TALLER
  setEstadoTaller: async (id) => {
    try {
      return db.Equipo.update(
        {
          id_estado: 3,
        },
        {
          where: { id: id },
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
