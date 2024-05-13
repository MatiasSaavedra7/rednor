const db = require('../models');
const Op = db.Sequelize.Op;

module.exports = {
    getAll: async () => {
        try {
            return await db.Marca.findAll();
        } catch (error) {
            console.log(error);
        }
    }
}