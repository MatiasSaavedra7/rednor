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
      console.log(req.body);
      
      const { nombre, descripcion, condiciones, dia_vencimiento, frecuencia, mes, forma_pago, entidad_bancaria, nro_tarjeta, cbu, cuit, email, telefono, divisa, monto } = req.body;

      let data = {
        id_categoria: req.params.idCategoria,
        nombre: nombre,
        descripcion: descripcion,
        condiciones: condiciones,
        dia_vencimiento: dia_vencimiento,
        frecuencia: frecuencia,
        mes: mes,
        id_forma_pago: forma_pago,
        entidad_bancaria: entidad_bancaria,
        nro_tarjeta: nro_tarjeta,
        cbu: cbu,
        cuit: cuit,
        email: email,
        telefono: telefono,
        divisa: divisa,
        monto: monto,
      }

      let gasto = await gastosService.create(data);

      if (!gasto) {
        res.send("Error al crear el gasto. Intente nuevamente. <a href='/'>Volver al inicio</a>");
      }

      /* let dataPago = {
        id_gasto: gasto.id,
        id_forma_pago: req.body.forma_pago,
        entidad_bancaria: req.body.entidad_bancaria,
        cbu: req.body.cbu,
        cuit: req.body.cuit,
        divisa: req.body.divisa,
        monto: req.body.monto,
        fecha_pago: fechaActual,
        fecha_vencimiento: new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, req.body.dia_vencimiento),
      } */

      // let pago = await pagosService.create(dataPago);

      // res.redirect(`/gastos/${req.params.idCategoria}/detalle`);

      // res.redirect(`/gastos/${req.params.idCategoria}/servicio/${gasto.id}/pagos`);
      res.redirect(`/gastos/${req.params.idCategoria}/servicio/${gasto.id}`)
    } catch (error) {
      console.log(error);
    }
  },

  // Pagina para ver el detalle de un gasto
  detalleGasto: async (req, res) => {
    try {
      //  Traer la información de la categoría
      let categoria = await categoriasService.getOneByPK(req.params.idCategoria);
  
      //  Traer la información del gasto/servicio
      let gasto = await gastosService.getOneByPK(req.params.idServicio);
  
      //  Traer la información de todos los pagos/servicios
      let pagos = await pagosService.getAllByIdGasto(req.params.idServicio);
      // console.log("Pagos", pagos);

      let anios = await pagosService.getAnios(req.params.idServicio);
      console.log("Años disponibles: ", anios);

      anios.forEach((anio, index) => {
        console.log(`Año[${index}]: `, anio.year);
      });

      // let pagosPorAnio = await pagosService.getPagosPorAnio(req.params.idServicio, anios[0].year);
      // console.log("Pagos por año: ", pagosPorAnio);
      
      //  Traer la informacion de todas las formas de pago
      let formas_pago = await formasPagoService.getAll();

      // Ordenar los pagos por fecha (del más reciente al más antiguo)
      pagos.sort((a, b) => new Date(a.fecha_pago) - new Date(b.fecha_pago));
      
      // Obtener el último pago
      // let ultimoPago = pagos.length > 0 ? pagos[pagos.length - 1] : null;
  
      res.render('gastos/servicios/detalleGasto', { categoria, gasto, /*pagos,*/ formas_pago, anios });
    } catch (error) {
      console.log(error);
    }
  },

  aniosDisponibles: async (req, res) => {
    try {
      //  Obtener el id del gasto/servicio
      let idGasto = req.params.idServicio;

      //  Traer los años disponibles para un gasto/servicio
      let pagos = await pagosService.getAnios(idGasto);

      if (!pagos) {
        res.status(404).json({ error: "No se encontraron pagos asociados al año" });
      }

      res.json(pagos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los pagos del año" });
      console.log(error);
    }
  },

  pagosPorAnio: async (req, res) => {
    try {
      //  Obtener el año y el id del gasto/servicio
      let year = req.params.year;
      let idGasto = req.params.idServicio;
      
      let pagos = await pagosService.getPagosPorAnio(idGasto, year);

      if (!pagos) {
        res.status(404).json({ error: "No se encontraron pagos asociados al año" });
      }

      res.json(pagos);
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

      let fechaActual = new Date();

      const { id_forma_pago, entidad_bancaria, nro_tarjeta, mes, cbu, cuit, divisa, monto } = req.body;

      let dataPago = {
        id_gasto: req.params.idServicio,
        id_forma_pago: id_forma_pago,
        entidad_bancaria: entidad_bancaria,
        nro_tarjeta: nro_tarjeta,
        cbu: cbu,
        cuit: cuit,
        divisa: divisa,
        mes: mes,
        monto: monto,
        fecha_pago: fechaActual,
        fecha_vencimiento: new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, gasto.dia_vencimiento),
      }

      await pagosService.create(dataPago);

      res.redirect(`/gastos/${gasto.id_categoria}/servicio/${gasto.id}`);

      console.log(dataPago);
    } catch (error) {
      console.log(error);
    }
  }
  
};
