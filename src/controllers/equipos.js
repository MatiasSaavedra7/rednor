module.exports = {
    getAll: (req, res) => {
        res.render('equipos/equipos')
    },
    
    getOneByPk: (req, res) => {
        let id = req.params.id;
        res.render(`equipos/detalleEquipo`, { id })
    },

    create: (req, res) => {
        res.render('equipos/registerFormEquipo')
    },

    store: (req, res) => {
        res.send('ALMACENAR EL NUEVO EQUIPO EN BD')
    },

    edit: (req, res) => {
        let id = req.params.id;
        res.send(`FORMULARIO PARA EDITAR LA INFORMACION DEL EQUIPO ${id}`)
    },

    update: (req, res) => {
        res.send('ALMACENAR INFORMACION ACTUALIZADA DEL EQUIPO')
    }
}