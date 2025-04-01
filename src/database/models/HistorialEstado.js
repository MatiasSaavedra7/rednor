module.exports = (sequelize, dataTypes) => {
  const alias = "HistorialEstado";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_equipo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_estado_anterior: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_estado_nuevo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: dataTypes.DATE,
      allowNull: false,
    },
  };

  const config = {
    tableName: "historial_estados",
    timestamps: false,
  };

  const HistorialEstado = sequelize.define(alias, cols, config);

  HistorialEstado.associate = function(models) {
    HistorialEstado.belongsTo(models.Equipo, {
      as: "equipo",
      foreignKey: "id_equipo",
    });
  }

  return HistorialEstado;
};