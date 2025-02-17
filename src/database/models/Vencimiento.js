module.exports = (sequelize, dataTypes) => {
  let alias = "Vencimiento";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cuota: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    fecha_vencimiento: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    interes_financiero: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    interes_resarcitorio: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    total: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: false,
    }
  }

  let config = {
    tableName: "vencimientos",
    timestamps: false,
  };

  let Vencimiento = sequelize.define(alias, cols, config);

  Vencimiento.associate = function (models) {
    Vencimiento.belongsTo(models.Cuota, {
      as: "cuota",
      foreignKey: "id_cuota",
      onDelete: "CASCADE",
    });
  };

  return Vencimiento;
};
