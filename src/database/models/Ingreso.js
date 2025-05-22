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
    detalle: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    id_estado: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    id_cliente: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    departamento: {
      type: dataTypes.STRING(50),
      allowNull: true,
    }
  };

  let config = {
    tableName: "ingresos",
    timestamps: false,
  };

  const Ingreso = sequelize.define(alias, cols, config);

  Ingreso.associate = function (models) {
    Ingreso.belongsTo(models.Equipo, {
      as: "equipo",
      foreignKey: "id_equipo",
    });

    Ingreso.belongsTo(models.EstadoTaller, {
      as: "estado",
      foreignKey: "id_estado",
    });

    Ingreso.hasMany(models.Informe, {
      as: "informes",
      foreignKey: "id_ingreso",
    });

    Ingreso.hasMany(models.Insumo, {
      as: "insumos",
      foreignKey: "id_ingreso",
    })

    Ingreso.hasOne(models.Egreso, {
      as: "egreso",
      foreignKey: "id_ingreso",
    });

    Ingreso.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "id_usuario",
    });

    Ingreso.belongsTo(models.Cliente, {
      as: "cliente",
      foreignKey: "id_cliente",
    });
  };

  return Ingreso;
};
