const db = require('../models');
const Op = db.Sequelize.Op;

const { Equipo } = require('../utils/objects');

module.exports = {
    getAll: async () => {
        try {
            return db.Equipo.findAll({
                include: ['marca', 'estado']
            });
        } catch (error) {
            console.log(error);
        }
    },

    getOneByPK: async (id) => {
        try {
            return db.Equipo.findOne({
                where: {
                    id: id
                },
                include: ['marca', 'estado']
            })
        } catch (error) {
            console.log(error);
        }
    },

    create: async (data) => {
        try {
            return db.Equipo.create(new Equipo(data));
        } catch (error) {
            console.log(error);
        }   
    }
}