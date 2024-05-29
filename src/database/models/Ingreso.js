module.exports = (sequelize, dataTypes) => {
  let alias = "Ingreso";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_equipo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    fecha_ingreso: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    motivo: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
  };

  let config = {
    tableName: "ingresos",
    createdAt: "fecha_ingreso",
    updatedAt: false,
  };

  const Ingreso = sequelize.define(alias, cols, config);

  Ingreso.associate = function (models) {
    Ingreso.belongsTo(models.Equipo, {
      as: "equipo",
      foreignKey: "id_equipo"
    });

    Ingreso.hasOne(models.Egreso, {
      as: "egreso",
      foreignKey: "id_ingreso"
    })
  };

  return Ingreso;
};
