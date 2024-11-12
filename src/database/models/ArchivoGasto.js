module.exports = (sequelize, dataTypes) => {
  let alias = "ArchivoGasto";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_gasto: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(255),
      allowNull: false,
    }
  };

  let config = {
    tableName: "archivos_gastos",
    timestamps: false,
  }

  let ArchivoGasto = sequelize.define(alias, cols, config);

  ArchivoGasto.associate = (models) => {
    ArchivoGasto.belongsTo(models.Gasto, {
      as: "gasto",
      foreignKey: "id_gasto",
    })
  }


  return ArchivoGasto;
}