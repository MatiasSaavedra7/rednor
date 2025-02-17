module.exports = (sequelize, dataTypes) => {
  let alias = "PagoHonorario";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_honorario: {
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
      type: dataTypes.STRING(11),
      allowNull: true,
    },
    divisa: {
      type: dataTypes.STRING(3),
      allowNull: true,
    },
    monto: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha_pago: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    fecha_vencimiento: {
      type: dataTypes.DATE,
      allowNull: false,
    },
  };

  let config = {
    tableName: "pagos_honorarios",
    timestamps: false,
  };

  let PagoHonorario = sequelize.define(alias, cols, config);

  PagoHonorario.associate = function (models) {
    PagoHonorario.belongsTo(models.Honorario, {
      as: "honorario",
      foreignKey: "id_honorario",
    });

    PagoHonorario.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago",
    });

    PagoHonorario.hasMany(models.ArchivoPagoHonorario, {
      as: "archivos",
      foreignKey: "id_pago_honorario",
    })
  }

  return PagoHonorario;
}