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
      allowNull: false,
    },
    condiciones: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    frecuencia: {
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    dia_vencimiento: {
      type: dataTypes.STRING(2),
      allowNull: false,
    }
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
    })
  };

  return Gasto;
};
