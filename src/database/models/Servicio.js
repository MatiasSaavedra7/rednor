module.exports = (sequelize, dataTypes) => {
  let alias = "Servicio";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING(50),
      allowNull: true,
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    condiciones: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    dia_vencimiento: {
      type: dataTypes.STRING(2),
      allowNull: true,
    },
    frecuencia: {
      type: dataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },
    telefono: {
      type: dataTypes.STRING(20),
      allowNull: true,
    },
  };

  let config = {
    tableName: "servicios",
    timestamps: false,
  };

  let Servicio = sequelize.define(alias, cols, config);

  Servicio.associate = function (models) {
    Servicio.hasMany(models.PagoServicio, {
      as: "pagos_servicios",
      foreignKey: "id_servicio",
    });

    Servicio.hasMany(models.ArchivoServicio, {
      as: "archivos_servicio",
      foreignKey: "id_servicio",
    });

  };

  return Servicio;
};
