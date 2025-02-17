module.exports = (sequelize, dataTypes) => {
  const alias = "PagoACuenta";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_plan_pago: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    capital: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    interes_financiero: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    interes_resarcitorio: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    total: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    fecha_vencimiento: {
      type: dataTypes.DATE,
      allowNull: false,
    }
  };

  const config = {
    tableName: "pago_a_cuenta",
    timestamps: false,
  }

  let PagoACuenta = sequelize.define(alias, cols, config);

  PagoACuenta.associate = function(models) {
    PagoACuenta.belongsTo(models.Plan, {
      as: "plan_pago",
      foreignKey: "id_plan_pago",
      onDelete: "CASCADE",
    });
  };


  return PagoACuenta;
}