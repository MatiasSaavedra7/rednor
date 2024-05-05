module.exports = {
    getAll: (req, res) => {
        res.render('alquileres/alquileres');
    },

    create: (req, res) => {
        res.render('alquileres/registerFormAlquiler');
    }
}