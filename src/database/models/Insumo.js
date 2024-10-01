module.exports = (sequelize, dataTypes) => {
  let alias = "Insumo";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ingreso: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_informe: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nro_remito: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    observacion: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    fecha_entrega: {
      type: dataTypes.DATE,
      allowNull: false,
    },
  };

  let config = {
    tableName: "insumos",
    timestamps: false,
  };

  let Insumo = sequelize.define(alias, cols, config);

  Insumo.associate = function (models) {
    Insumo.belongsTo(models.Informe, {
      as: "informe",
      foreignKey: "id_informe",
    });

    Insumo.belongsTo(models.Ingreso, {
      as: "ingreso",
      foreignKey: "id_ingreso",
    })
  };

  return Insumo;
};
