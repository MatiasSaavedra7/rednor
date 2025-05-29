const db = require("../models");
const Op = db.Sequelize.Op;

function Equipo(data) {
  this.marca = data.marca;
  this.modelo = data.modelo;
  this.numero_serie = data.numero_serie;
  this.id_tipo_equipo = data.id_tipo_equipo;
  this.id_estado = data.id_estado;
  this.id_firma = data.id_firma;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Equipo.findAll({
        include: ["estado", "tipo", "firma"],
        where: {
          id_estado: { [Op.ne]: 5 }
        }
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  countAll: async () => {
    try {
      return await db.Equipo.count({
        where: {
          id_estado: { [Op.ne]: 5 }
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Metodo para traer aquellos equipos disponibles para ingreso al taller (id_estado: 1, 2, 3)
  getAllDisponibles: async () => {
    try {
      return await db.Equipo.findAll({
        include: ["estado", "tipo"],
        where: {
          id_estado: { [Op.in]: [1, 2, 3] },
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  getOneDisponible: async (id) => {
    try {
      return await db.Equipo.findOne({
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
      return await db.Equipo.findAll({
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
      return await db.Equipo.findOne({
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
      return await db.Equipo.findAll({
        include: ["estado", "tipo", "ingreso"],
        where: {
          id_estado: 4,
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  countAllTaller: async () => {
    try {
      return await db.Equipo.count({
        where: {
          id_estado: 4,
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneTaller: async (id) => {
    try {
      return await db.Equipo.findOne({
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
      return await db.Equipo.findOne({
        where: { id: id },
        include: ["estado", "tipo", "firma"],
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  create: async (data) => {
    try {
      return await db.Equipo.create(new Equipo(data));
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Equipo.destroy({where: {id : id}})
    } catch (error) {
      console.log(error);
    }
  },
  
  updateByPK: async (data, id) => {
    try {
      return await db.Equipo.update(data, { where: { id: id } })
    } catch (error) {
      console.log(error);
    }
  }
};
