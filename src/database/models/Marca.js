module.exports = (sequelize, dataTypes) => {
    let alias = 'Marca';

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
        tableName: 'marcas',
        timestamps: false
    };

    let Marca = sequelize.define(alias, cols, config);

    return Marca;
}