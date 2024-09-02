const equiposService = require("../database/services/equiposService");
const marcasService = require("../database/services/marcasService");
const alquileresService = require("../database/services/alquileresService");
const tiposEquiposService = require("../database/services/tiposEquiposService");

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
      let tipos = await tiposEquiposService.getAll();
      res.render("equipos/registroEquipo", { marcas, tipos });
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
          ...req.body,
          id_estado: 1,
        };
        let equipo = await equiposService.create(data);
        //  Este bloque de codigo redirecciona directamente a la pagina de detalle del cliente recien creado
        if (equipo) {
          res.redirect(`/equipos/detalle/${equipo.id}`);
        }
      } else {
        let marcas = await marcasService.getAll();
        let tipos = await tiposEquiposService.getAll();
        res.render("equipos/registroEquipo", {
          marcas,
          tipos,
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    try {
      let equipo = await equiposService.getOneByPK(req.params.id);
      let marcas = await marcasService.getAll();
      let tipos = await tiposEquiposService.getAll();
      res.render("equipos/editarEquipo", { equipo, marcas, tipos });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        await equiposService.updateByPK(req.params.id, req.body);
        res.redirect(`/equipos/detalle/${req.params.id}`);
      } else {
        let equipo = await equiposService.getOneByPK(req.params.id);
        let marcas = await marcasService.getAll();
        let tipos = await tiposEquiposService.getAll();
        res.render("equipos/editarEquipo", {
          errors: errors.mapped(),
          old: req.body,
          equipo,
          marcas,
          tipos,
        });
      }
    } catch (error) {
      res.status(500).send(error)
    }
  },
};
