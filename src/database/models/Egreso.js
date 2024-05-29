module.exports = (sequelize, dataTypes) => {
  let alias = "Egreso";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ingreso: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    fecha_egreso: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    detalle_reparacion: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    costo: {
      type: dataTypes.DECIMAL,
    },
  };

  let config = {
    tableName: "egresos",
    createdAt: "fecha_egreso",
    updatedAt: false,
  };

  const Egreso = sequelize.define(alias, cols, config);

  Egreso.associate = function (models) {
    Egreso.belongsTo(models.Ingreso, {
      as: "ingreso",
      foreignKey: "id_ingreso"
    });
  };

  return Egreso;
};
