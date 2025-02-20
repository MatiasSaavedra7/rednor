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
    detalle: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: dataTypes.DECIMAL,
      allowNull: true,
    },
    id_forma_pago: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    fecha_cobro: {
      type: dataTypes.DATE,
      allowNull: true,
    },
    fecha_egreso: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    id_usuario: {
      type: dataTypes.INTEGER,
      allowNull: true,
    }
  };

  let config = {
    tableName: "egresos_externos",
    timestamps: false,
  };

  const EgresoExterno = sequelize.define(alias, cols, config);

  EgresoExterno.associate = function (models) {
    EgresoExterno.belongsTo(models.IngresoExterno, {
      as: "ingreso",
      foreignKey: "id_ingreso_externo"
    });

    EgresoExterno.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago"
    });

    EgresoExterno.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "id_usuario"
    });
  };

  return EgresoExterno;
};
