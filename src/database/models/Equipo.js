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
    precio: {
      type: dataTypes.DECIMAL,
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
    fecha_reajuste: {
      type: dataTypes.DATE,
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

    Equipo.hasMany(models.Alquiler, {
      as: "alquiler",
      foreignKey: "id_equipo",
    });

    Equipo.hasMany(models.Ingreso, {
      as: "ingreso",
      foreignKey: "id_equipo"
    });
  };

  return Equipo;
};