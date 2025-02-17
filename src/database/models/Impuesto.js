module.exports = (sequelize, dataTypes) => {
  let alias = "Impuesto";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    tipo: {
      type: dataTypes.STRING(30),
      allowNull: true,
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
      allowNull: false,
    },
    frecuencia: {
      type: dataTypes.STRING(20),
      allowNull: true,
    },
  };

  let config = {
    tableName: "impuestos",
    timestamps: false,
  };

  let Impuesto = sequelize.define(alias, cols, config);

  Impuesto.associate = function (models) {

    /*Impuesto.hasMany(models.Pago, {
      as: "pago",
      foreignKey: "id_gasto",
    });

    Impuesto.belongsTo(models.FormaPago, {
      as: "forma_pago",
      foreignKey: "id_forma_pago",
    })

    Impuesto.hasMany(models.ArchivoGasto, {
      as: "archivos",
      foreignKey: "id_gasto",
    })*/
  };

  return Impuesto;
};
