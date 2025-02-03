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
    id_tipo_cliente: {
      type: dataTypes.INTEGER,
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
    cuit: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    inscripcion_afip: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    condicion_afip: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    formulario_005: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    // Modificaciones 03/02/2025
    razon_social: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    domicilio_comercial: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "clientes",
    timestamps: false,
  };

  let Cliente = sequelize.define(alias, cols, config);

  Cliente.associate = function (models) {
    Cliente.belongsTo(models.TipoCliente, {
      as: "tipo",
      foreignKey: "id_tipo_cliente",
    });

    Cliente.hasMany(models.Habilitado, {
      as: "habilitados",
      foreignKey: "id_cliente",
    });

    Cliente.hasMany(models.Alquiler, {
      as: "alquiler",
      foreignKey: "id_cliente",
    });
  };

  return Cliente;
};
