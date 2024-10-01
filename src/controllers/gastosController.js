const categoriasService = require("../database/services/categoriasService.js");
const formasPagoService = require("../database/services/formasPagoService.js");
const gastosService = require("../database/services/gastosService.js");
const pagosService = require("../database/services/pagosService.js");

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
      console.log(req.body);
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
      // Traer informacion de la categoria
      let categoria = await categoriasService.getOneByPK(req.params.idCategoria);

      // Traer informacion del gasto
      let gasto = await gastosService.getOneByPK(req.params.idServicio);
      console.log(gasto);
      

      // Traer informacion del pago
      let pagos = await pagosService.getOneByPK(req.params.idPago);
      console.log(pagos);
      
      
      res.render("gastos/servicios/detalleGasto", { categoria, gasto, pagos });
    } catch (error) {
      console.log(error);
    }
  },
  
};
