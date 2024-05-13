module.exports = (sequelize, dataTypes) => {
  let alias = "Contacto";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  };

  let config = {
    tableName: "contacto",
    timestamps: false,
  };

  const Contacto = sequelize.define(alias, cols, config);

  Contacto.associate = function (models) {
    Contacto.hasOne(models.Cliente, {
      as: "clientes",
      foreignKey: "id_contacto",
    });
  };

  return Contacto;
};
