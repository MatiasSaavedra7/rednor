module.exports = (sequelize, dataTypes) => {
  let alias = "Usuario";

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
    apellido: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    id_rol: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "usuarios",
    timestamps: false,
  };

  let Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Rol, {
      as: "rol",
      foreignKey: "id_rol",
    });
  };

  return Usuario;
};
