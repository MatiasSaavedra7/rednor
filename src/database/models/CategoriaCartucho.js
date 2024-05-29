module.exports = (sequelize, dataTypes) => {
  let alias = "CategoriaCartucho";

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
    tableName: "categorias_cartucho",
    timestamps: false,
  };

  let CategoriaCartucho = sequelize.define(alias, cols, config);

  CategoriaCartucho.associate = function (models) {
    CategoriaCartucho.hasMany(models.Cartucho, {
      as: "cartucho",
      foreignKey: "id_categoria_cartucho",
    });
  };

  return CategoriaCartucho;
};
