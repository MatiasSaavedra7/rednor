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
    minimo_copias: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    precio_copias: {
      type: dataTypes.DECIMAL,
      allowNull: false,
    },
    precio: {
      type: dataTypes.DECIMAL,
      allowNull: false,
    },
    firma: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    numero_facturacion: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    departamento: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    fecha_alta: {
      type: dataTypes.DATE,
    },
    fecha_baja: {
      type: dataTypes.DATE,
    },
    activo: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
    },
    fecha_reajuste: {
      type: dataTypes.DATE,
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

    Alquiler.hasMany(models.Reajuste, {
      as: "reajuste",
      foreignKey: "id_alquiler",
    });
  };
  return Alquiler;
};
