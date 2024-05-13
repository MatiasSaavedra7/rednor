const tiposService = require('../database/services/tiposService');

module.exports = {
    tipos: async (req, res) => {
        try {
            let tipos = await tiposService.getAll();
        } catch (error) {
            console.log(error.message);   
        }
    }
}