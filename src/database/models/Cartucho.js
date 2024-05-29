module.exports = (sequelize, dataTypes) => {
  let alias = "Cartucho";

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
    etiqueta: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    SKU: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_categoria_cartucho: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "cartuchos",
    timestamps: false,
  };

  let Cartucho = sequelize.define(alias, cols, config);

  Cartucho.associate = function (models) {
    Cartucho.belongsTo(models.CategoriaCartucho, {
      as: "categoria_cartucho",
      foreignKey: "id_categoria_cartucho",
    });
  };

  return Cartucho;
};
