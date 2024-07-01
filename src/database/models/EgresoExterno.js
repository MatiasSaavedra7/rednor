module.exports = (sequelize, dataTypes) => {
  let alias = "EgresoExterno";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ingreso_externo: {
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
    tableName: "egresos_externos",
    createdAt: "fecha_egreso",
    updatedAt: false,
  };

  const EgresoExterno = sequelize.define(alias, cols, config);

  EgresoExterno.associate = function (models) {
    EgresoExterno.belongsTo(models.IngresoExterno, {
      as: "ingreso",
      foreignKey: "id_ingreso_externo"
    });
  };

  return EgresoExterno;
};
