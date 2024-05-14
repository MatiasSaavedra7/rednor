const equiposService = require("../database/services/equiposService");
const marcasService = require("../database/services/marcasService");
const estadosService = require("../database/services/estadosService");

const { validationResult } = require("express-validator");

module.exports = {
  // METODO PARA LEER TODOS LOS EQUIPOS ALMACENADOS EN LA BASE DE DATOS
  getAll: async (req, res) => {
    try {
      let equipos = await equiposService.getAll();
      res.render("equipos/equipos", { equipos });
    } catch (error) {}
  },
  // METODO PARA BUSCAR UN EQUIPO A TRAVES DE SU CLAVE PRIMARIA
  getOneByPk: async (req, res) => {
    let equipo = await equiposService.getOneByPK(req.params.id);
    res.render(`equipos/detalleEquipo`, { equipo });
  },
  // METODO PARA MOSTRAR EL FORMULARIO PARA REGISTRAR UN NUEVO EQUIPO
  create: async (req, res) => {
    try {
      let marcas = await marcasService.getAll();
      res.render("equipos/registerFormEquipo", { marcas });
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA ALMACENAR UN NUEVO EQUIPO EN LA BASE DE DATOS
  store: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let equipo = await equiposService.create(req.body); // El segundo parametro refiere al estado, por defecto al crear un nuevo equipo el estado inicial es Disponible
        //  Este bloque de codigo redirecciona directamente a la pagina de detalle del cliente recien creado
        if (equipo) {
          res.redirect(`/equipos/detalle/${equipo.id}`);
        }
      } else {
        let marcas = await marcasService.getAll();
        res.render("equipos/registerFormEquipo", {
          marcas,
          errors: errors.mapped(),
          old: req.body
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  edit: (req, res) => {
    let id = req.params.id;
    res.send(`FORMULARIO PARA EDITAR LA INFORMACION DEL EQUIPO ${id}`);
  },

  update: (req, res) => {
    res.send("ALMACENAR INFORMACION ACTUALIZADA DEL EQUIPO");
  },
};
