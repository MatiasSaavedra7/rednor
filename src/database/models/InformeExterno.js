module.exports = (sequelize, dataTypes) => {
  let alias = "InformeExterno";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ingreso_externo: {
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
    tableName: "informes_externos",
    createdAt: "fecha",
    updatedAt: false,
  };

  let InformeExterno = sequelize.define(alias, cols, config);

  InformeExterno.associate = function (models) {
    InformeExterno.belongsTo(models.IngresoExterno, {
      as: "ingreso",
      foreignKey: "id_ingreso_externo",
    });
  };

  return InformeExterno;
};
