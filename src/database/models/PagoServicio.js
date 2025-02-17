module.exports = (sequelize, dataTypes) => {
  let alias = "PagoServicio";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_servicio: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_forma_pago: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    entidad_bancaria: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },
    cbu: {
      type: dataTypes.STRING(22),
      allowNull: true,
    },
    cuit: {
      type: dataTypes.STRING(13),
      allowNull: true,
    },
    divisa: {
      type: dataTypes.STRING(3),
      allowNull: true,
    },
    monto: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    fecha_pago: {
      type: dataTypes.DATE,
      allowNull: true,
    },
    fecha_vencimiento: {
      type: dataTypes.DATE,
      allowNull: true,
    }
  };

  let config = {
    tableName: "pagos_servicios",
    timestamps: false,
  };

  let PagoServicio = sequelize.define(alias, cols, config);

  PagoServicio.associate = function (models) {
    PagoServicio.belongsTo(models.Servicio, {
      as: "servicio",
      foreignKey: "id_servicio",
    });

    PagoServicio.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago",
    });

    PagoServicio.hasMany(models.ArchivoPagoServicio, {
      as: "archivos",
      foreignKey: "id_pago_servicio",
    });
  };

  return PagoServicio;
}