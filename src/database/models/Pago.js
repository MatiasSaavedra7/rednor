module.exports = (sequelize, dataTypes) => {
  let alias = "Pago";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_gasto: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_forma_pago: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    entidad_bancaria: {
      type: dataTypes.STRING(50),
      allowNull: true,
    },
    cbu: {
      type: dataTypes.STRING(22),
      allowNull: true,
    },
    cuit: {
      type: dataTypes.STRING(13),
      allowNull: true,
    },
    divisa: {
      type: dataTypes.STRING(5),
      allowNull: true,
    },
    monto: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha_pago: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    fecha_vencimiento: {
      type: dataTypes.DATE,
      allowNull: false,
    }
  };

  let config = {
    tableName: "pagos",
    timestamps: false,
  };

  let Pago = sequelize.define(alias, cols, config);

  Pago.associate = function (models) {
    Pago.belongsTo(models.Gasto, {
      as: "gasto",
      foreignKey: "id_gasto",
    });

    Pago.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago",
    });

    Pago.hasMany(models.ArchivoPago, {
      as: "archivos_pagos",
      foreignKey: "id_pago"
    })
  };

  return Pago;
};
