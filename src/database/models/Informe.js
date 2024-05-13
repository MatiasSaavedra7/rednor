module.exports = (sequelize, dataTypes) => {
    let alias = 'Informe';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_equipo: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    let config = {
        tableName: 'informes',
        timestamps: false
    };

    let Informe = sequelize.define(alias, cols, config);

    Informe.associate = function(models){
        Informe.belongsTo(models.Equipo, {
            as: 'equipo',
            foreignKey: 'id_equipo'
        });
    };

    return Informe;
}