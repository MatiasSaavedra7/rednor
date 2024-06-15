module.exports = (sequelize, dataTypes) => {
  let alias = "TipoEquipo";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "tipos_equipos",
    timestamps: false,
  };

  let TipoEquipo = sequelize.define(alias, cols, config);

  TipoEquipo.associate = function (models) {
    TipoEquipo.hasMany(models.Equipo, {
      as: "equipo",
      foreignKey: "id_tipo_equipo",
    });
  };

  return TipoEquipo;
};
