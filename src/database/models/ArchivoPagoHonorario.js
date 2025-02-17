module.exports = (sequelize, dataTypes) => {
  let alias = "ArchivoPagoHonorario";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_pago_honorario: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "archivos_pagos_honorarios",
    timestamps: false,
  }

  const ArchivoPagoHonorario = sequelize.define(alias, cols, config);

  ArchivoPagoHonorario.associate = function (models) {
    ArchivoPagoHonorario.belongsTo(models.PagoHonorario, {
      as: "pago_honorario",
      foreignKey: "id_pago_honorario",
    });
  };


  return ArchivoPagoHonorario;
}