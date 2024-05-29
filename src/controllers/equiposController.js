const equiposService = require("../database/services/equiposService");
const marcasService = require("../database/services/marcasService");
const alquileresService = require("../database/services/alquileresService");

const { validationResult } = require("express-validator");

module.exports = {
  // METODO PARA LEER TODOS LOS EQUIPOS ALMACENADOS EN LA BASE DE DATOS
  equipos: async (req, res) => {
    try {
      let equipos = await equiposService.getAll();
      res.render("equipos/equipos", { equipos });
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA BUSCAR UN EQUIPO A TRAVES DE SU CLAVE PRIMARIA
  detalleEquipo: async (req, res) => {
    try {
      let equipo = await equiposService.getOneByPK(req.params.id);
      let alquiler = await alquileresService.getByIdEquipo(equipo.id);
      res.render(`equipos/detalleEquipo`, { equipo, alquiler });
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA MOSTRAR EL FORMULARIO PARA REGISTRAR UN NUEVO EQUIPO
  create: async (req, res) => {
    try {
      let marcas = await marcasService.getAll();
      res.render("equipos/registroEquipo", { marcas });
    } catch (error) {
      console.log(error);
    }
  },
  // METODO PARA ALMACENAR UN NUEVO EQUIPO EN LA BASE DE DATOS
  store: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let data = {
          id_estado: 1,
          ...req.body,
        };
        let equipo = await equiposService.create(data);
        //  Este bloque de codigo redirecciona directamente a la pagina de detalle del cliente recien creado
        if (equipo) {
          res.redirect(`/equipos/detalle/${equipo.id}`);
        }
      } else {
        let marcas = await marcasService.getAll();
        res.render("equipos/registroEquipo", {
          marcas,
          errors: errors.mapped(),
          old: req.body,
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
