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
      allowNull: true,
    },
    id_equipo: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    minimo_copias: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    precio_copias: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    precio: {
      type: dataTypes.DECIMAL,
      allowNull: false,
    },
    id_firma: {
      type: dataTypes.INTEGER,
      allowNull: true,
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
      onDelete: "SET NULL", //  Si un equipo es eliminado, el campo id_equipo de la tabla alquiler queda en NULL

    });

    Alquiler.hasMany(models.Reajuste, {
      as: "reajuste",
      foreignKey: "id_alquiler",
    });

    Alquiler.belongsTo(models.Firma, {
      as: "firma",
      foreignKey: "id_firma",
      onDelete: "SET NULL",
    });
  };
  return Alquiler;
};
