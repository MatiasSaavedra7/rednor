module.exports = (sequelize, dataTypes) => {
  let alias = "Habilitado";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_cliente: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    puesto: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "personas_habilitadas",
    timestamps: false,
  };

  let Habilitado = sequelize.define(alias, cols, config);

  return Habilitado;
};
