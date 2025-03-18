const db = require("../models");
const Op = db.Sequelize.Op;

function IngresoExterno(data) {
  this.id_equipo = data.id_equipo;
  this.motivo = data.motivo;
  this.detalle = data.detalle;
  this.id_estado = data.id_estado;
  this.fecha_ingreso = data.fecha_ingreso;
  this.nombre_cliente = data.nombre_cliente;
  this.telefono_cliente = data.telefono_cliente;
  this.ciudad_cliente = data.ciudad_cliente;
  this.direccion_cliente = data.direccion_cliente;
  this.id_usuario = data.id_usuario;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.IngresoExterno.findAll({
        include: ["equipo", "egreso", "informe" ,"estado"],
      });
    } catch (error) {
      console.log(error);
      let consoleMessage = `\n\n[ERROR] No se pudo obtener los ingresos externos: ${error}\n\n`;
      console.log(consoleMessage);
    }
  },

  getAllByIdEquipo: async (id) => {
    try {
      return await db.IngresoExterno.findAll({
        where: { id_equipo: id },
        attributes: ["id", "motivo", "fecha_ingreso", ],
        // include: ["equipo", "egreso", "informe", "insumo" ,"estado"],
        order: [["fecha_ingreso", "DESC"]]
      });
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo obtener los ingresos externos por id de equipo: ${error}\n\n`;
      console.log(consoleMessage);
    }
  },

  getLastFiveByIdEquipo: async (id, fecha) => {
    try {
      return await db.IngresoExterno.findAll({
        where: { 
          id_equipo: id,
          // [db.Sequelize.Op.not]: db.Sequelize.literal('EXISTS (SELECT 1 FROM egresos_externos WHERE egresos_externos.id_ingreso_externo = IngresoExterno.id)')  
          fecha_ingreso: {
            [Op.lt]: fecha,
          },
         },
        include: [{
          model: db.EgresoExterno,
          as: "egreso",
          attributes: ["id", "fecha_egreso"]
        }],
        attributes: ["id", "motivo", "fecha_ingreso"],
        order: [["fecha_ingreso", "DESC"]],
        limit: 5,
        raw: true,
      })
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.IngresoExterno.findOne({
        where: { id: id },
        include: [
          { model: db.EquipoExterno, as: "equipo" },
          { model: db.EstadoTaller, as: "estado" },
          {
            model: db.Usuario,
            as: "usuario",
            attributes: ["id", "nombre", "apellido"]
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (data) => {
    try {
      return await db.IngresoExterno.create(new IngresoExterno(data));
    } catch (error) {
      // let consoleMessage = `\n\n[ERROR] No se pudo crear el ingreso externo: ${error}\n\n`;
      console.log(error);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.IngresoExterno.update(data, {
        where: { id: id },
      });
    } catch (error) {
      // let consoleMessage = `\n\n[ERROR] No se pudo actualizar el ingreso externo por id: ${error}\n\n`;
      console.log(error);
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.IngresoExterno.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  }
};