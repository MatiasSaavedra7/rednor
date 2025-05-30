module.exports = (sequelize, dataTypes) => {
  let alias = "Firma";

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
    tableName: "firmas",
    timestamps: false,
  };

  let Firma = sequelize.define(alias, cols, config);

  Firma.associate = function(models) {
    Firma.hasMany(models.Alquiler, {
      as: "firma",
      foreignKey: "id_firma",
      onDelete: "SET NULL",
    });

    Firma.hasMany(models.Cliente, {
      as: "clientes",
      foreignKey: "id_firma",
      onDelete: "SET NULL",
    });

    Firma.hasMany(models.Equipo, {
      as: "equipos",
      foreignKey: "id_firma",
      onDelete: "SET NULL",
    });
  }

  return Firma;
};
