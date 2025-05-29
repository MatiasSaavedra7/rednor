const db = require("../models");
const Op = db.Sequelize.Op;

function Cliente(data) {
  this.nombre = data.nombre;
  this.id_tipo_cliente = data.id_tipo_cliente;
  this.email = data.email;
  this.telefono = data.telefono;
  this.ciudad = data.ciudad;
  this.direccion = data.direccion;
  this.inscripcion_afip = data.inscripcion_afip;
  this.condicion_afip = data.condicion_afip;
  this.formulario_005 = data.formulario_005;
  this.razon_social = data.razon_social;
  this.domicilio_comercial = data.domicilio_comercial;
  this.DocTipo = data.DocTipo;
  this.DocNro = data.DocNro;
  this.id_firma = data.id_firma;
}

module.exports = {
  getAll: async () => {
    try {
      return await db.Cliente.findAll({
        include: ["tipo", "firma"],
      });
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  countAll: async () => {
    try {
      return await db.Cliente.count();  
    } catch (error) {
      console.log(error);
    }
  },

  getOneByPK: async (id) => {
    try {
      return await db.Cliente.findOne({
        where: { id: id },
        include: ["tipo", "firma"],
      });
    } catch (error) {
      console.log(error.message);
      return [];
    }
  },

  create: async (data, id) => {
    try {
      return await db.Cliente.create(new Cliente(data));
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  updateByPK: async (data, id) => {
    try {
      return await db.Cliente.update(data, {
        where: { id: id }
      })
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  deleteByPK: async (id) => {
    try {
      return await db.Cliente.destroy({ where : { id: id } });
    } catch (error) {
      console.log(error);
    }
  }
};
