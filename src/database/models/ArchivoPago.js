module.exports = (sequelize, dataTypes) => {
  let alias = "ArchivoPago";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_pago: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(255),
      allowNull: false,
    }
  };

  let config = {
    tableName: "archivos_pagos",
    timestamps: false,
  }

  let ArchivoPago = sequelize.define(alias, cols, config);

  ArchivoPago.associate = (models) => {
    ArchivoPago.belongsTo(models.Pago, {
      as: "pago",
      foreignKey: "id_pago",
    })
  }


  return ArchivoPago;
}