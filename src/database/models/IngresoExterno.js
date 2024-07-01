module.exports = (sequelize, dataTypes) => {
  let alias = "IngresoExterno";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fecha_ingreso: {
      type: dataTypes.DATE,
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
    tableName: "ingresos_externos",
    createdAt: "fecha_ingreso",
    updatedAt: false,
  };

  const IngresoExterno = sequelize.define(alias, cols, config);

  IngresoExterno.associate = function (models) {
    IngresoExterno.hasOne(models.EgresoExterno, {
      as: "egreso",
      foreignKey: "id_ingreso_externo"
    })
  };

  return IngresoExterno;
};
