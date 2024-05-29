module.exports = (sequelize, dataTypes) => {
  let alias = "Cliente";

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
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    ciudad: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    id_tipo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    habilitado: {
      type: dataTypes.BOOLEAN,
    },
  };

  let config = {
    tableName: "clientes",
    timestamps: false,
  };

  let Cliente = sequelize.define(alias, cols, config);

  Cliente.associate = function (models) {
    Cliente.belongsTo(models.Tipo, {
      as: "tipo",
      foreignKey: "id_tipo",
    });

    Cliente.hasMany(models.Alquiler, {
      as: "alquiler",
      foreignKey: "id_cliente",
    });
  };

  return Cliente;
};
