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
      allowNull: true,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    ciudad: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: dataTypes.STRING,
      allowNull: true,
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
    razon_social: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    domicilio_comercial: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    DocTipo: {
      type: dataTypes.STRING(2),
      allowNull: true,
    },
    DocNro: {
      type: dataTypes.STRING(13),
      allowNull: true,
    },
    id_firma: {
      type: dataTypes.INTEGER,
      allowNull: true,
    }
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

    Cliente.hasMany(models.Ingreso, {
      as: "ingresos",
      foreignKey: "id_cliente",
    });

    Cliente.belongsTo(models.Firma, {
      as: "firma",
      foreignKey: "id_firma",
      onDelete: "SET NULL",
    })
  };

  return Cliente;
};
