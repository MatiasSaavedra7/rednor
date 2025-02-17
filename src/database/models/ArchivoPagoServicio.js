module.exports = (sequelize, dataTypes) => {
  let alias = "ArchivoPagoServicio";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_pago_servicio: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "archivos_pagos_servicios",
    timestamps: false,
  }

  const ArchivoPagoServicio = sequelize.define(alias, cols, config);

  ArchivoPagoServicio.associate = function (models) {
    ArchivoPagoServicio.belongsTo(models.PagoServicio, {
      as: "pago_servicio",
      foreignKey: "id_pago_servicio",
    });
  };


  return ArchivoPagoServicio;
}