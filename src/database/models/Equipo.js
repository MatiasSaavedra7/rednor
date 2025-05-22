module.exports = (sequelize, dataTypes) => {
  let alias = "Equipo";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    marca: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    numero_serie: {
      type: dataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    id_tipo_equipo: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    id_estado: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "equipos",
    timestamps: false,
  };

  let Equipo = sequelize.define(alias, cols, config);

  Equipo.associate = function (models) {
    Equipo.belongsTo(models.Estado, {
      as: "estado",
      foreignKey: "id_estado",
    });

    Equipo.belongsTo(models.TipoEquipo, {
      as: "tipo",
      foreignKey: "id_tipo_equipo"
    })

    Equipo.hasOne(models.Alquiler, {
      as: "alquiler",
      foreignKey: "id_equipo",
    });

    Equipo.hasMany(models.Ingreso, {
      as: "ingreso",
      foreignKey: "id_equipo",
    });

    Equipo.hasMany(models.HistorialEstado, {
      as: "historial",
      foreignKey: "id_equipo",
    })
  };

  return Equipo;
};
