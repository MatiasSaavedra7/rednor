module.exports = (sequelize, dataTypes) => {
  let alias = "Plan";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nro_plan: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    cuit: {
      type: dataTypes.STRING(13),
      allowNull: false,
    },
    cbu: {
      type: dataTypes.STRING(22),
      allowNull: false,
    },
    fecha_consolidacion: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    cantidad_cuotas: {
      type: dataTypes.INTEGER,
      allowNull: false,
    }
  };

  let config = {
    tableName: "planes",
    timestamps: false,
  };

  let Plan = sequelize.define(alias, cols, config);

  Plan.associate = function (models) {
    Plan.hasMany(models.PagoACuenta, {
      as: "pagos_a_cuenta",
      foreignKey: "id_plan_pago",
      onDelete: "CASCADE",
    });

    Plan.hasMany(models.Cuota, {
      as: "cuotas",
      foreignKey: "id_plan_pago",
      onDelete: "CASCADE",
    });
  };

  return Plan;
};