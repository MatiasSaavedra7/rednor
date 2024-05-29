module.exports = (sequelize, dataTypes) => {
  let alias = "Alquiler";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_cliente: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_equipo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    firma: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    departamento: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    fecha_alta: {
      type: dataTypes.DATE,
    },
    fecha_baja: {
      type: dataTypes.DATE,
    },
    activo: {
      type: dataTypes.BOOLEAN,
      allowNull: false
    },
  };

  let config = {
    tableName: "alquileres",
    createdAt: "fecha_alta",
    updatedAt: false,
  };

  let Alquiler = sequelize.define(alias, cols, config);

  Alquiler.associate = function (models) {
    Alquiler.belongsTo(models.Cliente, {
      as: "cliente",
      foreignKey: "id_cliente",
    });

    Alquiler.belongsTo(models.Equipo, {
      as: "equipo",
      foreignKey: "id_equipo",
    });
  };
  return Alquiler;
};
