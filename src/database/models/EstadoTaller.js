module.exports = (sequelize, dataTypes) => {
  let alias = "EstadoTaller";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "estados_taller",
    timestamps: false,
  };

  let EstadoTaller = sequelize.define(alias, cols, config);

  EstadoTaller.associate = function (models) {
    EstadoTaller.hasMany(models.IngresoExterno, {
      as: "ingreso_externo",
      foreignKey: "id_estado",
    });
    
    EstadoTaller.hasMany(models.Ingreso, {
      as: "ingreso",
      foreignKey: "id_estado",
    })
  };

  return EstadoTaller;
};
