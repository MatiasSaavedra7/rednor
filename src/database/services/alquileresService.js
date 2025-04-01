const db = require("../models");
const Op = db.Sequelize.Op;

function Alquiler(data) {
  this.id_cliente = data.id_cliente;
  this.id_equipo = data.id_equipo;
  this.minimo_copias = data.minimo_copias;
  this.precio_copias = data.precio_copias;
  this.precio = data.precio;
  this.firma = data.firma;
  this.numero_facturacion = data.numero_facturacion;
  this.departamento = data.departamento;
  this.fecha_alta = data.fecha_alta;
  this.fecha_baja = data.fecha_baja;
  this.fecha_reajuste = data.fecha_reajuste;
  this.activo = data.activo; // Por defecto, al crear un nuevo alquiler, el valor será true (o 1).
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Alquiler.findAll({
        include: ["cliente", "equipo"],
        order: [["activo", "DESC"]],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllActivosConVencimiento: async () => {
    try {
      return await db.Alquiler.findAll({
        where: {
          activo: true,
          fecha_baja: {[Op.ne]: null},
        },
        include: ["cliente", "equipo"]
      })
    } catch (error) {
      console.log(error);  
    }
  },

  getAllActivos: async () => {
    try {
      return await db.Alquiler.findAll({
        where: {
          activo: true
        },
        include: ["cliente", "equipo"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  getAllInactivos: async () => {
    try {
      return await db.Alquiler.findAll({
        where: {
          activo: false
        },
        include: ["cliente", "equipo"]
      })
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Alquiler.findOne({
        where: { id: id },
        include: ["cliente", "equipo"],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getByIdCliente: async (id) => {
    try {
      return await db.Alquiler.findAll({
        include: ["cliente", "equipo"],
        where: {
          id_cliente: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getActiveByIdCliente: async (id) => {
    try {
      return await db.Alquiler.findAll({
        include: ["cliente", "equipo"],
        where: {
          id_cliente: id,
          activo: true,
        },
      })
    } catch (error) {
      console.log(error);
    }
  },

  getByIdEquipo: async (id) => {
    try {
      return await db.Alquiler.findOne({
        include: ["cliente", "equipo"],
        where: { 
          id_equipo: id,
          activo: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Alquiler.create(new Alquiler(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (data, id) => {
    try {
      return await db.Alquiler.update(data, { where: { id: id } });
    } catch (error) {
      console.log(error);
    }
  },
};
