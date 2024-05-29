const cartuchosService = require("../database/services/cartuchosService");
const categoriasService = require("../database/services/categoriaCartuchosService");

const { validationResult } = require("express-validator");

module.exports = {
  repuestos: async (req, res) => {
    try {
      let cartuchos = await cartuchosService.getAll();
      res.render("repuestos/cartuchos", { cartuchos });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      let categorias = await categoriasService.getAll();
      res.render("repuestos/registroCartucho", { categorias });
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let cartucho = await cartuchosService.create(req.body);
        if (cartucho) {
          res.redirect("/repuestos");
        }
      } else {
        let categorias = await categoriasService.getAll();
        res.render("repuestos/registroCartucho", {
          errors: errors.mapped(),
          old: req.body,
          categorias,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
