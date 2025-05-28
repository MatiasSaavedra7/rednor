module.exports = (sequelize, dataTypes) => {
  let alias = "EquipoExterno";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    marca: {
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    modelo: {
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    numero_serie: {
      type: dataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    id_tipo_equipo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "equipos_externos",
    timestamps: false,
  };

  let EquipoExterno = sequelize.define(alias, cols, config);

  EquipoExterno.associate = function (models) {
    EquipoExterno.belongsTo(models.TipoEquipo, {
      as: "tipo",
      foreignKey: "id_tipo_equipo",
    });

    EquipoExterno.hasMany(models.IngresoExterno, {
      as: "ingreso",
      foreignKey: "id_equipo",
    });
  };

  return EquipoExterno;
};
