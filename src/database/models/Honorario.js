module.exports = (sequelize, dataTypes) => {
  let alias = "Honorario";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    tableName: "honorarios",
    timestamps: false,
  };

  let Honorario = sequelize.define(alias, cols, config);

  Honorario.associate = function (models) {
    Honorario.hasMany(models.ArchivoHonorario, {
      as: "archivos",
      foreignKey: "id_honorario",
    });
  };

  return Honorario;
};
