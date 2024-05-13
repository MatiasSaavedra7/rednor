const db = require('../models');
const Op = db.Sequelize.Op;

const { Cliente } = require('../utils/objects');

module.exports = {
    getAll: async () => {
        try {
            return await db.Cliente.findAll({
                include: ['contacto', 'tipo']
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    getOneByPK: async (id) => {
        try {
            return await db.Cliente.findOne({
                where: { id: id },
                include: ['contacto', 'tipo']
            })
        } catch (error) {
            console.log(error.message);
        }
    },

    create: async (data, id) => {
        try {
            return await db.Cliente.create(new Cliente(data, id));
        } catch (error) {
            console.log(error);
        }
    }
}