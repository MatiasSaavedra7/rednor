module.exports = (sequelize, dataTypes) => {
  let alias = "InsumoExterno";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ingreso_externo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_informe_externo: {
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
    tableName: "insumos_externos",
    timestamps: false,
  };

  let InsumoExterno = sequelize.define(alias, cols, config);

  InsumoExterno.associate = function (models) {
    InsumoExterno.belongsTo(models.IngresoExterno, {
      as: "ingreso",
      foreignKey: "id_ingreso_externo",
    });

    InsumoExterno.belongsTo(models.InformeExterno, {
      as: "informe",
      foreignKey: "id_informe_externo",
    });
  };

  return InsumoExterno;
};
