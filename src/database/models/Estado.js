module.exports = (sequelize, dataTypes) => {
    let alias = 'Estado';

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
    }

    let config = {
        tableName: 'estados',
        timestamps: false
    }

    let Estado = sequelize.define(alias, cols, config);

    return Estado;
}