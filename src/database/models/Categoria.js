module.exports = (sequelize, dataTypes) => {
  let alias = "Categoria";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    dia_vencimiento: {
      type: dataTypes.STRING(2),
      allowNull: false,
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: true,
    }
  };

  let config = {
    tableName: "categorias",
    timestamps: false,
  };

  let  Categoria = sequelize.define(alias, cols, config);

   Categoria.associate = function (models) {
    Categoria.hasMany(models.Gasto, {
      as: "gasto",
      foreignKey: "id_categoria",
    })
  };

  return Categoria;
};
