module.exports = (sequelize, dataTypes) => {
  let alias = "Informe";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ingreso: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    detalle: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    pedido_insumos: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
    },
    fecha_informe: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    id_usuario: {
      type: dataTypes.INTEGER,
      allowNull: true,
    }
  };

  let config = {
    tableName: "informes",
    timestamps: false,
  };

  let Informe = sequelize.define(alias, cols, config);

  Informe.associate = function (models) {
    Informe.belongsTo(models.Ingreso, {
      as: "ingreso",
      foreignKey: "id_ingreso",
    });

    Informe.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "id_usuario",
    });
  };

  return Informe;
};
