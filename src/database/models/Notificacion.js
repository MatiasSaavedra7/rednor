module.exports = (sequelize, dataTypes) => {
  const alias = "Notificacion";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },
    mensaje: {
      type: dataTypes.STRING(255),
      allowNull: true,
    },
    url: {
      type: dataTypes.STRING(255),
      allowNull: true,
    },
    fecha: {
      type: dataTypes.DATE,
      allowNull: true,
    }
  };

  const config = {
    tableName: "notificaciones",
    timestamps: false,
  };

  const Notificacion = sequelize.define(alias, cols, config);

  Notificacion.associate = (models) => {
    Notificacion.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "id_usuario",
    });

    Notificacion.hasMany(models.NotificacionUsuario, {
      as: "notificacion_usuario",
      foreignKey: "id_notificacion",
    });
  }

  return Notificacion;
}