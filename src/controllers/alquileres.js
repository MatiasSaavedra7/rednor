const { getOneByPk } = require("./clientes");

module.exports = {
    getAll: (req, res) => {
        res.render('alquileres/alquileres');
    },

    getOneByPk: (req, res) => {
        let id = req.params.id;
        res.render('alquileres/detalleAlquiler', { id })
    },

    create: (req, res) => {
        res.render('alquileres/registerFormAlquiler');
    }
}