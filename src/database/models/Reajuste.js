module.exports = (sequelize, dataTypes) => {
  let alias = "Reajuste";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_alquiler: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    minimo_copias: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    precio_copias: {
      type: dataTypes.DECIMAL,
      allowNull: false,
    },
    precio: {
      type: dataTypes.DECIMAL,
      allowNull: false,
    },
    fecha_reajuste: {
      type: dataTypes.DATE,
    },
  };

  let config = {
    tableName: "reajustes",
    timestamps: false,
  };

  let Reajuste = sequelize.define(alias, cols, config);

  Reajuste.associate = function (models) {
    Reajuste.belongsTo(models.Alquiler, {
      as: "alquiler",
      foreignKey: "id_alquiler",
    });
  };
  return Reajuste;
};
