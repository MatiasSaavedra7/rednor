module.exports = (sequelize, dataTypes) => {
  let alias = "ArchivoHonorario";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_honorario: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "archivos_honorarios",
    timestamps: false,
  };

  const ArchivoHonorario = sequelize.define(alias, cols, config);

  ArchivoHonorario.associate = function (models) {
    ArchivoHonorario.belongsTo(models.Honorario, {
      as: "honorario",
      foreignKey: "id_honorario",
    });
  };

  return ArchivoHonorario;
}