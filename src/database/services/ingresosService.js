const db = require("../models");
const Op = db.Sequelize.Op;

function Ingreso(data) {
  this.id_equipo = data.id_equipo;
  this.fecha_ingreso = data.fecha_ingreso;
  this.motivo = data.motivo;
  this.detalle = data.detalle;
  this.id_estado = data.id_estado;
  this.id_usuario = data.id_usuario;
  this.id_cliente = data.id_cliente;
  this.departamento = data.departamento;
};

module.exports = {
  getAll: async () => {
    try {
      return await db.Ingreso.findAll({
        include: [
          { model: db.Equipo, as: "equipo" },
          { model: db.EstadoTaller, as: "estado" },
          { model: db.Egreso, as: "egreso" },
          { model: db.Cliente, as: "cliente", attributes: ["id", "nombre"] }

        ],
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Ingreso.findOne({
        where: { id: id },
        include: [
          { model: db.Equipo, as: "equipo" },
          { model: db.EstadoTaller, as: "estado" },
          { model: db.Usuario, as: "usuario" },
          { model: db.Cliente, as: "cliente", attributes: ["id", "nombre"] },
        ]
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOneByIdEquipo: async (id) => {
    try {
      return await db.Ingreso.findOne({
        where: { id_equipo: id },
        order: [["fecha_ingreso", "DESC"]],
        limit: 1,
        include: ["equipo", "egreso", "estado", "informes", "insumos"],
      })
    } catch (error) {
      console.log("[ERROR] Error en ingresosService.getOneByIdEquipo " + error);
      
    }
  },

  getAllByIdEquipo: async (id) => {
    try {
      return await db.Ingreso.findAll({
        where: { id_equipo: id },
        // include: ["equipo", "egreso", "estado", "informes", "insumos"],
      })
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.Ingreso.create(new Ingreso(data));
    } catch (error) {
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.Ingreso.update(data, {
        where: { id: id },
      })
    } catch (error) {
      let message = `[ERROR] Error en ingresosService.updateByPK: ${error}`;
      console.log(message);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Ingreso.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.log(error)
    }
  },

  // Metodos para la API
  getAllByIdEquipoAPI: async (id) => {
    try {
      return await db.Ingreso.findAll({
        where: { id_equipo: id },
        attributes: ["id", "fecha_ingreso", "motivo"],
        include: [{
          model: db.Egreso,   // Tabla Egresos
          as: "egreso",       // Alias para la relación Egreso con Ingreso
          required: true,     // Solo incluir los Ingresos que tienen un Egreso asociado
          attributes: [],     // No traer los atributos/columnas de Egreso
        }],
        order: [["fecha_ingreso", "DESC"]],
      })
    } catch (error) {
      let message = `[ERROR] Error en ingresosService.getAllByIdEquipoAPI: ${error}`;
      console.log(message);
    }
  },

  getOneByPKAPI: async (id) => {
    try {
      return db.Ingreso.findOne({
        where: { id: id },
        include: [
          { model: db.EstadoTaller, as: "estado" },
          { model: db.Equipo, as: "equipo" },
          { model: db.Usuario, as: "usuario", attributes: ["id", "nombre", "apellido"] },
        ]
      })
    } catch (error) {
      let message = `[ERROR] Error en ingresosService.getOneByPKAPI: ${error}`;
      console.log(message);
    }
  },

  getLastFiveByIdEquipo: async (id, fechaIngreso) => {
    try {
      return db.Ingreso.findAll({
        where: {
          id_equipo: id,
          fecha_ingreso: {
            [Op.lt]: fechaIngreso,
          },
        },
        attributes: ["id", "fecha_ingreso", "motivo"],
        order: [["fecha_ingreso", "DESC"]],
        limit: 5,
        include: ["estado", "equipo"],
      })
    } catch (error) {
      console.log(error);
    }
  },

  getAllWhereEstado: async (id) => {
    try {
      return await db.Ingreso.count({
        where: { id_estado: id }
      });
    } catch (error) {
     throw new Error(error); 
    }
  }
};
