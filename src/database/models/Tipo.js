module.exports = (sequelize, dataTypes) => {
    let alias = 'Tipo';

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
        tableName: 'tipos',
        timestamps: false
    };

    let Tipo = sequelize.define(alias, cols, config);

    Tipo.associate = function(models){
        Tipo.hasMany(models.Cliente, {
            as: 'clientes',
            foreignKey: 'id_tipo'
        });
    }

    return Tipo;
}