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
}

module.exports = {
  getAll: async () => {
    try {
      return await db.IngresoExterno.findAll({
        include: ["equipo", "egreso", "informe" ,"estado"],
      });
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo obtener los ingresos externos: ${error}\n\n`;
      console.log(consoleMessage);
    }
  },

  getAllByIdEquipo: async (id) => {
    try {
      return await db.IngresoExterno.findAll({
        where: { id_equipo: id },
        attributes: ["id", "motivo", "fecha_ingreso", /*"detalle", "nombre_cliente", "telefono_cliente", "ciudad_cliente", "direccion_cliente"*/],
        // include: ["equipo", "egreso", "informe", "insumo" ,"estado"],
        // raw: true,
      });
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo obtener los ingresos externos por id de equipo: ${error}\n\n`;
      console.log(consoleMessage);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.IngresoExterno.findOne({
        where: { id: id },
        include: ["equipo", /*"egreso", "informe",*/ "estado", /*"insumo"*/],
      });
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo obtener el ingreso externo por id: ${error}\n\n`;
      console.log(consoleMessage);
    }
  },

  create: async (data) => {
    try {
      return await db.IngresoExterno.create(new IngresoExterno(data));
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo crear el ingreso externo: ${error}\n\n`;
      console.log(consoleMessage);
    }
  },

  updateByPK: async (id, data) => {
    try {
      return await db.IngresoExterno.update(data, {
        where: { id: id },
      });
    } catch (error) {
      let consoleMessage = `\n\n[ERROR] No se pudo actualizar el ingreso externo por id: ${error}\n\n`;
      console.log(consoleMessage);
    }
  },
};
