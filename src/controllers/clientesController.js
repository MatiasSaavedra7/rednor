const fs = require("fs");
const path = require("path");

const clientesService = require("../database/services/clientesService");
const tiposClientesService = require("../database/services/tiposClientesService");
const alquileresService = require("../database/services/alquileresService");
const habilitadosService = require("../database/services/habilitadosService");

const { validationResult } = require("express-validator");

module.exports = {
  clientes: async (req, res) => {
    try {
      const clientes = await clientesService.getAll();
      res.render("clientes/clientes", { clientes });
    } catch (error) {
      console.log(error);
    }
  },

  detalleCliente: async (req, res) => {
    try {
      const cliente = await clientesService.getOneByPK(req.params.id);
      // const alquileres = await alquileresService.getByIdCliente(req.params.id);
      const alquileres = await alquileresService.getActiveByIdCliente(req.params.id)
      const habilitados = await habilitadosService.getAllByPK(req.params.id);
      res.render("clientes/detalleCliente", { cliente, alquileres, habilitados });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const tipos = await tiposClientesService.getAll();
      res.render("clientes/registroCliente", { tipos });
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let inscripcion_name = req.files["inscripcion_afip"] ? req.files["inscripcion_afip"][0].filename : null;
        // let condicion_name = req.files["condicion_afip"] ? req.files["condicion_afip"][0].filename : null;
        let formulario_name = req.files["formulario_005"] ? req.files["formulario_005"][0].filename : null;

        let data = {
          ...req.body,
          inscripcion_afip: inscripcion_name,
          // condicion_afip: condicion_name,
          formulario_005: formulario_name,
        }
        let cliente = await clientesService.create(data);
        if (cliente) {
          res.redirect(`/clientes/detalle/${cliente.id}`);
        }
      } else {
        let tipos = await tiposClientesService.getAll();
        res.render("clientes/registroCliente", {
          errors: errors.mapped(),
          old: req.body,
          tipos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    try {
      const cliente = await clientesService.getOneByPK(req.params.id);
      const tipos = await tiposClientesService.getAll();
      res.render("clientes/editarCliente", { cliente, tipos });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let cliente = await clientesService.getOneByPK(req.params.id);

        let inscripcion_name = req.files["inscripcion_afip"] ? req.files["inscripcion_afip"][0].filename : cliente.inscripcion_afip;
        let condicion_name = req.files["condicion_afip"] ? req.files["condicion_afip"][0].filename : cliente.condicion_afip;
        let formulario_name = req.files["formulario_005"] ? req.files["formulario_005"][0].filename : cliente.formulario_005;
        
        let data = {
          ...req.body,
          inscripcion_afip: inscripcion_name,
          condicion_afip: condicion_name,
          formulario_005: formulario_name,
        }
        
        await clientesService.updateByPK(data, req.params.id);

        res.redirect(`/clientes/detalle/${req.params.id}`)
      } else {
        const cliente = await clientesService.getOneByPK(req.params.id);
        const tipos = await tiposClientesService.getAll();
        res.render("clientes/editarCliente", {
          errors: errors.mapped(),
          old: req.body,
          cliente,
          tipos
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // eliminarDocumento: async (req, res) => {
  //   try {
  //     const clienteId = req.params.id;

  //     const cliente = await clientesService.getOneByPK(clienteId);

  //     if (!cliente) {
  //         return res.status(404).send("Cliente no encontrado");
  //     }

      
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // },

  subirInscripcionAFIP: async (req, res) => {
    try {
      let idCliente = req.params.id;

      let cliente = await clientesService.getOneByPK(idCliente);

      if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
      }

      await clientesService.updateByPK({ inscripcion_afip: req.file.filename }, idCliente);

      res.redirect(`/clientes/detalle/${idCliente}`);
    } catch (error) {
      console.log(error);
    }
  },

  eliminarInscripcionAFIP: async (req, res) => {
    try {
      let idCliente = req.params.id;
      
      let cliente = await clientesService.getOneByPK(idCliente);

      if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
      }

      const filePath = path.join(__dirname, "../../public/docs/inscripciones", cliente.inscripcion_afip);

      // Eliminar el archivo del sistema de archivos
      fs.unlink(filePath, (error) => {
        if (error) {
          console.log("Error eliminando el archivo del sistema de archivos", error);
        }
      })

      // Actualizar el valor del campo inscripcion_afip a null en la base de datos
      await clientesService.updateByPK({ inscripcion_afip: null }, idCliente);

      res.redirect("back");
      // res.redirect(`/clientes/detalle/${idCliente}`);
    } catch (error) {
      console.log(error);
      
    }
  },

  subirFormulario005: async (req, res) => {
    try {
      let idCliente = req.params.id;

      let cliente = await clientesService.getOneByPK(idCliente);

      if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
      }

      await clientesService.updateByPK({ formulario_005: req.file.filename }, idCliente);

      res.redirect(`/clientes/detalle/${idCliente}`);
    } catch (error) {
      console.log(error);
    }
  },

  eliminarFormulario005: async (req, res) => {
    try {
      let idCliente = req.params.id;

      let cliente = await clientesService.getOneByPK(idCliente);

      if (!cliente) {
        return res.status(404).send("Cliente no encontrado");
      }

      const filePath = path.join(__dirname, "../../public/docs/formulario005", cliente.formulario_005);

      // Eliminar el archivo del sistema de archivos
      fs.unlink(filePath, (error) => {
        if (error) {
          console.log("Error eliminando el archivo del sistema de archivos", error);
        }
      })

      // Actualizar el valor del campo inscripcion_afip a null en la base de datos
      await clientesService.updateByPK({ formulario_005: null }, idCliente);

      // Refrescar la pagina
      res.redirect("back");
    } catch (error) {
      console.log(error);
      
    }
  }


};
