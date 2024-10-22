const categoriasService = require("../database/services/categoriasService.js");
const formasPagoService = require("../database/services/formasPagoService.js");
const gastosService = require("../database/services/gastosService.js");
const pagosService = require("../database/services/pagosService.js");
const archivosPagosService = require("../database/services/archivosPagosService.js");

module.exports = {
  // Pagina principal de gastos
  mainGastos: async (req, res) => {
    try {
      let categorias = await categoriasService.getAll();

      res.render("gastos/main", { categorias });
    } catch (error) {
      console.log(error);
    }
  },

  //  Detalle de cada categoria
  detalleCategoria: async (req, res) => {
    try {
      // Traer informacion de la categoria
      let categoria = await categoriasService.getOneByPK(req.params.idCategoria);
      // Traer todos los gastos con el id de la categoria
      let gastos = await gastosService.getAllByIdCategoria(req.params.idCategoria);
      
      res.render("gastos/servicios/detalleCategoria", { categoria, gastos });
    } catch (error) {
      console.log(error);
    }
  },

  // Registrar gastos en una categoria
  registroGastos: async (req, res) => {
    try {
      let categoria = await categoriasService.getOneByPK(req.params.idCategoria);
      let formas_pago = await formasPagoService.getAll();
      res.render("gastos/servicios/registroGastos", { categoria, formas_pago });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarGastos: async (req, res) => {
    try {
      let fechaActual = new Date()

      let dataGasto = {
        id_categoria: req.params.idCategoria,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        condiciones: req.body.condiciones,
        dia_vencimiento: req.body.dia_vencimiento,
        frecuencia: req.body.frecuencia,
      }

      let gasto = await gastosService.create(dataGasto);

      let dataPago = {
        id_gasto: gasto.id,
        id_forma_pago: req.body.forma_pago,
        entidad_bancaria: req.body.entidad_bancaria,
        cbu: req.body.cbu,
        cuit: req.body.cuit,
        divisa: req.body.divisa,
        monto: req.body.monto,
        fecha_pago: fechaActual,
        fecha_vencimiento: new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, req.body.dia_vencimiento),
      }

      let pago = await pagosService.create(dataPago);

      res.redirect(`/gastos/${req.params.idCategoria}/detalle`);
    } catch (error) {
      console.log(error);
    }
  },

  // Pagina para ver el detalle de un gasto
  detalleGasto: async (req, res) => {
    try {
      //  Traer la información de la categoría
      let categoria = await categoriasService.getOneByPK(req.params.idCategoria);
  
      //  Traer la información del gasto
      let gasto = await gastosService.getOneByPK(req.params.idServicio);
  
      //  Traer la información de todos los pagos
      let pagos = await pagosService.getAllByIdGasto(req.params.idServicio);

      //  Traer la informacion de todas las formas de pago
      let formas_pago = await formasPagoService.getAll();

      // Ordenar los pagos por fecha (del más reciente al más antiguo)
      pagos.sort((a, b) => new Date(a.fecha_pago) - new Date(b.fecha_pago));
      
      // Obtener el último pago
      let ultimoPago = pagos.length > 0 ? pagos[pagos.length - 1] : null;
  
      res.render('gastos/servicios/detalleGasto', { categoria, gasto, pagos, ultimoPago, formas_pago});
    } catch (error) {
      console.log(error);
    }
  },

  detallePago: async (req, res) => {
    try {
      //  Traer informacion del pago
      let pago = await pagosService.getOneByPK(req.params.idPago);
      
      if(!pago) {
        return res.status(404).json({ error: "Pago no encontrado" });
      }

      res.json(pago);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los detalles del pago"});
      console.log(error);
    }
  },

  nuevoPago: async (req ,res) => {
    try {
      let gasto = await gastosService.getOneByPK(req.params.idServicio);

      console.log(gasto);

      let fechaActual = new Date();

      let dataPago = {
        id_gasto: req.params.idServicio,
        id_forma_pago: req.body.id_forma_pago,
        entidad_bancaria: req.body.entidad_bancaria,
        cbu: req.body.cbu,
        cuit: req.body.cuit,
        divisa: req.body.divisa,
        monto: req.body.monto,
        fecha_pago: fechaActual,
        fecha_vencimiento: new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, gasto.dia_vencimiento),
      }

      await pagosService.create(dataPago);

      res.redirect(`/gastos/${gasto.id_categoria}/servicio/${gasto.id}/pagos`);

      console.log(dataPago);
    } catch (error) {
      console.log(error);
    }
  }
  
};
