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
    fecha: {
      type: dataTypes.DATE,
    },
  };

  let config = {
    tableName: "informes",
    createdAt: "fecha",
    updatedAt: false,
  };

  let Informe = sequelize.define(alias, cols, config);

  Informe.associate = function (models) {
    Informe.belongsTo(models.Ingreso, {
      as: "ingreso",
      foreignKey: "id_ingreso",
    });
  };

  return Informe;
};
