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
    detalle: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    observacion: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: dataTypes.DECIMAL,
    },
    id_forma_pago: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    fecha_cobro: {
      type: dataTypes.DATE,
      allowNull: true,
    }
  };

  let config = {
    tableName: "egresos",
    timestamps: false,
  };

  const Egreso = sequelize.define(alias, cols, config);

  Egreso.associate = function (models) {
    Egreso.belongsTo(models.Ingreso, {
      as: "ingreso",
      foreignKey: "id_ingreso"
    });

    Egreso.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago"
    });

  };

  return Egreso;
};
