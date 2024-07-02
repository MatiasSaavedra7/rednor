require("dotenv").config();

// MODULOS
const axios = require("axios");

// MODELOS
const cartuchosService = require("../database/services/cartuchosService");
const categoriasService = require("../database/services/categoriaCartuchosService");

// INFO API
const URL = "https://rednor.com.ar/wp-json/wc/v3/products";
const username = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;
const auth = Buffer.from(`${username}:${password}`).toString("base64");

const { validationResult } = require("express-validator");

module.exports = {
  repuestos: async (req, res) => {
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      const repuestos = response.data;
      // res.send(repuestos);
      res.render("repuestos/cartuchos", { repuestos });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener los datos");
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
