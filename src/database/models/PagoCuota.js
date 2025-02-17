// Modelo que representa la tabla 'pagos_cuotas' de la base de datos
/*
  Tiene como finalidad almacenar en la base de datos los pagos realizados de cada cuota
*/

module.exports = (sequelize, dataTypes) => {
  let alias = "PagoCuota";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cuota: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_vencimiento: {
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
    tableName: "pagos_planes",
    timestamps: false,
  };

  let PagoCuota = sequelize.define(alias, cols, config);

  PagoCuota.associate = function (models) {
    // Cada Pago tiene relacion uno-a-uno con Cuota
    PagoCuota.belongsTo(models.Cuota, {
      as: "cuota",
      foreignKey: "id_cuota",
    });

    PagoCuota.belongsTo(models.Vencimiento, {
      as: "vencimiento",
      foreignKey: "id_vencimiento"
    })

    // Cada Pago tiene relacion uno-a-uno con FormaPago
    PagoCuota.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago",
    });

    // PagoCuota.hasMany(models.ArchivoPagoServicio, {
    //   as: "archivos",
    //   foreignKey: "id_pago_servicio",
    // });
  };

  return PagoCuota;
}