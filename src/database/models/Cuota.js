module.exports = (sequelize, dataTypes) => {
  let alias = "Cuota";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_plan_pago: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nro_cuota: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    capital: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  }
  
  let config = {
    tableName: "cuotas",
    timestamps: false,
  };

  let Cuota = sequelize.define(alias, cols, config);

  Cuota.associate = function (models) {
    Cuota.belongsTo(models.Plan, {
      as: "plan_pago",
      foreignKey: "id_plan_pago",
      onDelete: "CASCADE",
    });

    Cuota.hasMany(models.Vencimiento, {
      as: "vencimientos",
      foreignKey: "id_cuota",
      onDelete: "CASCADE",
    });

    Cuota.hasOne(models.PagoCuota, {
      as: "pago_plan",
      foreignKey: "id_cuota",
    })
  };

  return Cuota;
};
