module.exports = (sequelize, dataTypes) => {
  let alias = "FormaPago";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "formas_pago",
    timestamps: false,
  };

  let FormaPago = sequelize.define(alias, cols, config);

  FormaPago.associate = function (models) {
    FormaPago.hasMany(models.EgresoExterno, {
      as: "egreso_externo",
      foreignKey: "id_forma_pago"
    });

    FormaPago.hasMany(models.Egreso, {
      as: "egreso",
      foreignKey: "id_forma_pago"
    });

    FormaPago.hasMany(models.Pago, {
      as: "pago",
      foreignKey: "id_forma_pago"
    });

    FormaPago.hasMany(models.Gasto, {
      as: "gasto",
      foreignKey: "id_forma_pago"
    })
  };

  return FormaPago;
};
