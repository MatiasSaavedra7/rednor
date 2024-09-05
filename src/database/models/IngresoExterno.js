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
    id_estado: {
      type: dataTypes.INTEGER,
      allowNull: false,
    }
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
      foreignKey: "id_ingreso_externo",
    });

    IngresoExterno.hasMany(models.InformeExterno, {
      as: "informe",
      foreignKey: "id_ingreso_externo",
    });

    IngresoExterno.belongsTo(models.EstadoTaller, {
      as: "estado",
      foreignKey: "id_estado",
    });
  };

  return IngresoExterno;
};
