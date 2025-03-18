module.exports = (sequelize, dataTypes) => {
  let alias = "Usuario";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: dataTypes.BOOLEAN,
    },
    id_rol: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "usuarios",
    timestamps: false,
  };

  let Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Rol, {
      as: "rol",
      foreignKey: "id_rol",
    });

    Usuario.hasMany(models.Ingreso, {
      as: "ingresos",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.Egreso, {
      as: "egresos",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.Informe, {
      as: "informes",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.Insumo, {
      as: "insumos",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.IngresoExterno, {
      as: "ingresos_externos",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.EgresoExterno, {
      as: "egresos_externos",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.InformeExterno, {
      as: "informes_externos",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.InsumoExterno, {
      as: "insumos_externos",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.Notificacion, {
      as: "notificaciones",
      foreignKey: "id_usuario",
    });

    Usuario.hasMany(models.NotificacionUsuario, {
      as: "notificaciones_usuarios",
      foreignKey: "id_usuario"
    });
  };

  return Usuario;
};
