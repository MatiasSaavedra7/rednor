const db = require('../models');
const Op = db.Sequelize.Op;

const { Contacto } = require('../utils/objects');

module.exports = {
    getAll: async () => {
        try {
            return await db.Contacto.findAll();
        } catch (error) {
            console.log(error);
        }
    },

    create: async (data) => {
        try {
            return await db.Contacto.create(new Contacto(data));
        } catch (error) {
            console.log(error);
        }
    }
}