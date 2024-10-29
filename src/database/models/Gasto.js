module.exports = (sequelize, dataTypes) => {
  let alias = "Gasto";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_categoria: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    condiciones: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    frecuencia: {
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    dia_vencimiento: {
      type: dataTypes.STRING(2),
      allowNull: false,
    },
    id_forma_pago: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    entidad_bancaria: {
      type: dataTypes.STRING(50),
      allowNull: true,
    },
    cbu: {
      type: dataTypes.STRING(22),
      allowNull: true,
    },
    cuit: {
      type: dataTypes.STRING(13),
      allowNull: true,
    },
    nro_tarjeta: {
      type: dataTypes.STRING(16),
      allowNull: true,
    },
    divisa: {
      type: dataTypes.STRING(3),
      allowNull: true,
    },
    monto: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  };

  let config = {
    tableName: "gastos",
    timestamps: false,
  };

  let Gasto = sequelize.define(alias, cols, config);

  Gasto.associate = function (models) {
    Gasto.belongsTo(models.Categoria, {
      as: "categoria",
      foreignKey: "id_categoria",
    });

    Gasto.hasMany(models.Pago, {
      as: "pago",
      foreignKey: "id_gasto",
    });

    Gasto.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago",
    })
  };

  return Gasto;
};
