module.exports = (sequelize, dataTypes) => {
  let alias = "ArchivoServicio";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_servicio: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "archivos_servicios",
    timestamps: false,
  };

  const ArchivoServicio = sequelize.define(alias, cols, config);

  ArchivoServicio.associate = function (models) {
    ArchivoServicio.belongsTo(models.Servicio, {
      as: "servicio",
      foreignKey: "id_servicio",
    });
  };

  return ArchivoServicio;
}