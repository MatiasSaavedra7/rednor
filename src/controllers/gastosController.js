const categoriasService = require("../database/services/categoriasService.js");
const formasPagoService = require("../database/services/formasPagoService.js");
const gastosService = require("../database/services/gastosService.js");
const pagosService = require("../database/services/pagosService.js");
const archivosPagosService = require("../database/services/archivosPagosService.js");

// Planes de Pago & Moratorias
// const planPagoService = require("../database/services/planPagoService.js");
// const cuotasService = require("../database/services/cuotasService.js");
// const vencimientosService = require("../database/services/vencimientosService.js");

// Modulos para trabajar con archivos
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);

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

      res.redirect(`/gastos/${req.params.idCategoria}/servicio/${gasto.id}`)
    } catch (error) {
      console.log(error);
    }
  },

  // Formulario de registro Planes de Pago & Moratorias
  registroPlanPago: async (req, res) => {
    try {
      res.render("gastos/servicios/registroPlanPago");
    } catch (error) {
      console.log(error);
    }
  },

  almacenarPlanPago: async (req, res) => {
    try {
      const planPagoData = req.body;

      // Almacenar el plan de pago en la base de datos
      const planPago = await planPagoService.create({
        nro_plan: planPagoData.nro_plan,
        cuit: planPagoData.cuit,
        nombre: planPagoData.nombre,
        cbu: planPagoData.cbu,
        fecha_consolidacion: planPagoData.fecha_consolidacion,
        cantidad_cuotas: planPagoData.cantidad_cuotas,
      });

      if (!planPago) {
        return res.json({ error: "Error al crear el plan de pago" });
      }

      // Crear las cuotas
      for (let i = 0; i < planPagoData.cantidad_cuotas; i++) {
        const cuotaData = planPagoData.cuotas[i];
        // Almacenar la cuota en la base de datos
        const cuota = await cuotasService.create({
          id_plan_pago: planPago.id,
          nro_cuota: cuotaData.nro_cuota,
          capital: cuotaData.capital,
        });

        if (!cuota) {
          return res.json({ error: "Error al crear la cuota" });
        }

        // Crear los vencimientos
        for (let j = 0; j < 2; j++) { // 2 vencimientos por cuota
          const vencimientoData = cuotaData.vencimientos[j];
          // Almacenar el vencimiento en la base de datos
          const vencimiento = await vencimientosService.create({
            id_cuota: cuota.id,
            fecha_vencimiento: vencimientoData.fecha_vencimiento,
            interes_financiero: vencimientoData.interes_financiero,
            interes_resarcitorio: vencimientoData.interes_resarcitorio,
            total: vencimientoData.total,
          });

          if (!vencimiento) {
            return res.json({ error: "Error al crear el vencimiento" });
          }
        }
      }

      res.json({ message: "Plan de Pago creado correctamente" });
      
    } catch (error) {
      console.log("Error almacenando plan de pago: ", error);
      
    }
  },

  // Detalle de Planes de Pagos & Moratorias
  detallePlanPago: async (req, res) => {
    try {
      const planPago = await planPagoService.getAll();
      res.send(planPago);
    } catch (error) {
      console.error("Error al traer informacion de los planes de pagos: ", error);
    }
  },

  editarGasto: async (req, res) => {
    try {
      let categoria = await categoriasService.getOneByPK(req.params.idCategoria);
      let formas_pago = await formasPagoService.getAll();
      let gasto = await gastosService.getOneByPK(req.params.idServicio);

      res.render("gastos/servicios/editarGasto", { categoria, formas_pago, gasto });
    } catch (error) {
      console.log(error);
      res.send("Error al editar el gasto. Intente nuevamente. <a href='/'>Volver al inicio</a>");
    }
  },

  actualizarGasto: async (req, res) => {
    try {
      console.log(req.body);

      const { nombre, descripcion, condiciones, dia_vencimiento, frecuencia, mes, forma_pago, entidad_bancaria, nro_tarjeta, cbu, cuit, email, telefono, divisa, monto } = req.body;

      let dataToUpdate = {
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

      await gastosService.updateByPK(req.params.idServicio, dataToUpdate);

      res.redirect(`/gastos/${req.params.idCategoria}/servicio/${req.params.idServicio}`);
    } catch (error) {
      console.log(error);
    }
  },

  eliminarGasto: async (req, res) => {
    try {
      // Para eliminar correctamente un gasto/servicio, primero se deben eliminar los pagos asociados a este
      // Para eliminar correctamente un pago, primero se deben eliminar los archivos asociados a este
      // Luego se puede eliminar el gasto/servicio
      let gasto = await gastosService.getOneByPK(req.params.idServicio);
      let idCategoria = gasto.id_categoria

      // Traer los pagos asociados al gasto/servicio
      let pagos = await pagosService.getAllByIdGasto(req.params.idServicio);

      if (pagos.length > 0) {
        // Eliminar los archivos asociados a cada pago
        await Promise.all(pagos.map(async (pago) => {
          // Traer los archivos asociados a cada pago
          let archivos = await archivosPagosService.getAllByIdPago(pago.id);
          if (archivos.length > 0) {
            // Eliminar los archivos asociados a cada pago
            await Promise.all(archivos.map(async (archivo) => {
              // Eliminar el archivo de los archivos publicos
              let path = `public/docs/pagos/${archivo.nombre_archivo}`;
              try {
                await unlinkAsync(path);
              } catch (error) {
                console.log("Error eliminando el archivo del sistema de archivos: " + error);
              }
              await archivosPagosService.deleteByPK(archivo.id);              
            }));
          }
          // Eliminar el pago
          await pagosService.deleteByPK(pago.id);
        }));
      }

      // Eliminar el gasto/servicio
      await gastosService.deleteByPK(req.params.idServicio);

      // Redirigir a la pagina de la categoria
      res.redirect(`/gastos/${idCategoria}`);
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
