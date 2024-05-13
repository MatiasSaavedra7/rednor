module.exports = (sequelize, dataTypes) => {
  let alias = "Firma";

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
    tableName: "firmas",
    timestamps: false,
  };

  let Firma = sequelize.define(alias, cols, config);

  Firma.associate = function (models) {
    Firma.hasMany(models.Alquiler, {
      as: "alquiler",
      foreignKey: "id_firma",
    });
  };

  return Firma;
};
