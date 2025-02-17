module.exports = (sequelize, dataTypes) => {
  let alias = "TarjetaVisa";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    nro_tarjeta: {
      type: dataTypes.STRING(16),
      allowNull: true,
    },
    dia_vencimiento: {
      type: dataTypes.STRING(2),
      allowNull: false,
    },
    frecuencia: {
      type: dataTypes.STRING(30),
      allowNull: false,
    },
  };

  let config = {
    tableName: "tarjeta_visa",
    timestamps: false,
  };

  let TarjetaVisa = sequelize.define(alias, cols, config);

  TarjetaVisa.associate = function (models) {
    /*TarjetaVisa.belongsTo(models.Categoria, {
      as: "categoria",
      foreignKey: "id_categoria",
    });

    TarjetaVisa.hasMany(models.Pago, {
      as: "pago",
      foreignKey: "id_gasto",
    });

    TarjetaVisa.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago",
    })

    TarjetaVisa.hasMany(models.ArchivoGasto, {
      as: "archivos",
      foreignKey: "id_gasto",
    })*/
  };

  return TarjetaVisa;
};
