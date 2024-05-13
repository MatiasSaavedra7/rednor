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
    id_firma: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    departamento: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    fecha_vencimiento: {
      type: dataTypes.DATE,
      allowNull: false,
    },
  };

  let config = {
    tableName: "alquileres",
    timestamps: false,
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

    Alquiler.belongsTo(models.Firma, {
      as: "firma",
      foreignKey: "id_firma",
    });
  };
  return Alquiler;
};
