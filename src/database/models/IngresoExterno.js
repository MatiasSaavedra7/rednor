module.exports = (sequelize, dataTypes) => {
  let alias = "IngresoExterno";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_equipo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    motivo: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    detalle: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    id_estado: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    fecha_ingreso: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    nombre_cliente: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    telefono_cliente: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    ciudad_cliente: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    direccion_cliente: {
      type: dataTypes.STRING,
      allowNull: false,
    }
  };

  let config = {
    tableName: "ingresos_externos",
    timestamps: false,
  };

  const IngresoExterno = sequelize.define(alias, cols, config);

  IngresoExterno.associate = function (models) {
    IngresoExterno.belongsTo(models.EquipoExterno, {
      as: "equipo",
      foreignKey: "id_equipo",
    });
    
    IngresoExterno.hasOne(models.EgresoExterno, {
      as: "egreso",
      foreignKey: "id_ingreso_externo",
    });

    IngresoExterno.hasMany(models.InformeExterno, {
      as: "informe",
      foreignKey: "id_ingreso_externo",
    });

    IngresoExterno.belongsTo(models.EstadoTaller, {
      as: "estado",
      foreignKey: "id_estado",
    });
  };

  return IngresoExterno;
};
