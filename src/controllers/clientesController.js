const fs = require("fs");
const path = require("path");

const clientesService = require("../database/services/clientesService");
const tiposClientesService = require("../database/services/tiposClientesService");
const alquileresService = require("../database/services/alquileresService");
const habilitadosService = require("../database/services/habilitadosService");
const firmasService = require("../database/services/firmasService");

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
      const firmas = await firmasService.getAll();

      res.render("clientes/registroCliente", { tipos, firmas });
    } catch (error) {
      console.log(error);
    }
  },

  store: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        let inscripcion_name = req.files["inscripcion_afip"] ? req.files["inscripcion_afip"][0].filename : null;
        let formulario_name = req.files["formulario_005"] ? req.files["formulario_005"][0].filename : null;

        let data = {
          ...req.body,
          inscripcion_afip: inscripcion_name,
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
      const firmas = await firmasService.getAll();

      res.render("clientes/editarCliente", { cliente, tipos, firmas });
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
        let formulario_name = req.files["formulario_005"] ? req.files["formulario_005"][0].filename : cliente.formulario_005;
        
        let data = {
          ...req.body,
          inscripcion_afip: inscripcion_name,
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

  delete: async (req, res) => {
    try {
      // Capturar el ID del Cliente
      const id = req.params.id;

      const cliente = await clientesService.getOneByPK(id);

      if (!cliente) throw new Error("Cliente no encontrado.");

      // Archivo Inscripcion AFIP
      if (cliente.inscripcion_afip != null) {
        // Obtener la ruta del archivo
        const filePathInscripcionAFIP = path.join(__dirname, "../../public/docs/inscripciones", cliente.inscripcion_afip);
  
        // Eliminar el archivo del servidor
        await fs.promises.unlink(filePathInscripcionAFIP);
        console.log("Archivo Inscripcion AFIP eliminado correctamente.");
      }

      // Archivo Formulario 005
      if (cliente.formulario_005 != null) {
        // Obtener la ruta del archivo
        const filePathFormulario005 = path.join(__dirname, "../../public/docs/formulario005", cliente.formulario_005);
        
        // Eliminar el archivo del servidor
        await fs.promises.unlink(filePathFormulario005);
        console.log("Archivo Formulario 005 eliminado correctamente.");        
      }

      // Eliminar el Cliente de la Base de Datos
      await clientesService.deleteByPK(id);
      console.log("Cliente eliminado de la base de datos correctamente.");

      // Responder con un mensaje de exito
      return res.status(200).json({ message: "Cliente eliminado correctamente"});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Ocurrio un error intentando eliminar el cliente", error: error.message});
    }
  },

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

      res.redirect(`/clientes/detalle/${idCliente}`);
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
  },

  getCantidadTotalClientes: async function(req, res) {
    try {
      const clientes = await clientesService.getAll();

      if (!clientes) {
        throw new Error("Ocurrio un error al obtener la cantidad total de clientes.")
      };

      res.status(200).json({ total: clientes.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
