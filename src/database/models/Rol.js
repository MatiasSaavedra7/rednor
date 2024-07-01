module.exports = (sequelize, dataTypes) => {
  let alias = "Rol";

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
    tableName: "roles",
    timestamps: false,
  };

  let Rol = sequelize.define(alias, cols, config);

  Rol.associate = function (models) {
    Rol.hasMany(models.Usuario, {
      as: "rol",
      foreignKey: "id_rol",
    });
  };

  return Rol;
};
