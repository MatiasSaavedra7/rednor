module.exports = (sequelize, dataTypes) => {
    let alias = 'TipoCliente';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    let config = {
        tableName: 'tipos_clientes',
        timestamps: false
    };

    let Tipo = sequelize.define(alias, cols, config);

    Tipo.associate = function(models){
        Tipo.hasMany(models.Cliente, {
            as: 'clientes',
            foreignKey: 'id_tipo_cliente'
        });
    }

    return Tipo;
}