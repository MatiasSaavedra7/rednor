module.exports = (sequelize, dataTypes) => {
  const alias = "NotificacionUsuario";

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
    id_notificacion: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    leida: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
    }
  };

  const config = {
    tableName: "notificaciones_usuarios",
    timestamps: false,
  };

  const NotificacionUsuario = sequelize.define(alias, cols, config);

  NotificacionUsuario.associate = function(models) {
    NotificacionUsuario.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "id_usuario",
    });

    NotificacionUsuario.belongsTo(models.Notificacion, {
      as: "notificacion",
      foreignKey: "id_notificacion",
    });
  }

  return NotificacionUsuario;
}