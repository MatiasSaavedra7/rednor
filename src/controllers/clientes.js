module.exports = {
    getAll: (req, res) => {
        res.render('clientes/clientes')
    },

    getOneByPk: (req, res) => {
        let id = req.params.id;
        res.render('clientes/detalleCliente', { id })
    },

    create: (req, res) => {
        res.render('clientes/registerFormCliente')
    },

    store: (req, res) => {
        res.send('ALMACENAR EN BD EL NUEVO CLIENTE')
    },

    edit: (req, res) => {
        res.send('FORMULARIO PARA EDITAR LA INFORMACION DE UN CLIENTE')
    },

    update: (req, res) => {
        res.send('ALMACENAR INFORMACION ACTUALIZADA DEL CLIENTE')
    }
}