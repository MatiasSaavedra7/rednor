/*
  Planes de Pago & Moratorias Controller
*/

const planesService = require("../../database/services/planesService");
const pagoACuentaService = require("../../database/services/pagoACuentaService");
const cuotasService = require("../../database/services/cuotasService");
const vencimientosService = require("../../database/services/vencimientosService");
const formasPagoService = require("../../database/services/formasPagoService");

module.exports = {
  // Mostrar todos los Planes de Pago & Moratorias
  getAll: async (req, res) => {
    try {
      const planes = await planesService.getAll();

      // const planesJSON = planes.map( plan => plan.toJSON());

      // console.log(planesJSON);
      
      res.render("gastos/planes/planes", { planes });
    } catch (error) {
      res.send("Error en el servidor", error);
    }
  },

  // Mostrar un Plan de Pago & Moratoria por su PK
  getOneByPK: async (req, res) => {
    try {
      const plan = await planesService.getOneByPK(req.params.id);
      const formas_pago = await formasPagoService.getAll();

      // console.log("Plan de Pago: ", plan.toJSON());
      // console.log("Formas de Pago: ", formas_pago.map(forma => forma.toJSON()));
      const cuotas = plan.cuotas;
      // console.log(cuotas.map(cuota => cuota.toJSON()));

      const vencimiento = plan.cuotas[0].toJSON();
      console.log(vencimiento);
      
      res.render("gastos/planes/detalles", { plan, formas_pago });
    } catch (error) {
      res.send("Error en el servidor", error);
    }
  },

  // Mostrar el formulario para crear un nuevo Plan de Pago & Moratoria
  create: async (req, res) => {
    try {
      const formas_pago = await formasPagoService.getAll();

      res.render("gastos/planes/registro", { formas_pago });
    } catch (error) {
      res.send("Error en el servidor" + error);
    }
  },

  // Almacenar un nuevo Plan de Pago & Moratoria
  store: async (req, res) => {
    try {
      console.log(req.body);

      const { nro_plan, cuit, nombre, cbu, fecha_consolidacion, cantidad_cuotas, cuotas, pago_a_cuenta } = req.body;

      // console.log(`Vencimientos: ${cuotas.vencimientos}`);

      // Almacenar registro en la tabla planes_pagos
      const nuevoPlanPago = await planesService.create({
        nro_plan,
        cuit,
        nombre,
        cbu,
        fecha_consolidacion: new Date(fecha_consolidacion),
        cantidad_cuotas,
      });

      // Almacenar registro en la tabla pago_a_cuenta
      const nuevoPagoACuenta = await pagoACuentaService.create({
        id_plan_pago: nuevoPlanPago.id,
        capital: pago_a_cuenta.capital,
        interes_financiero: pago_a_cuenta.interes_financiero,
        interes_resarcitorio: pago_a_cuenta.interes_resarcitorio,
        total: pago_a_cuenta.total,
        fecha_vencimiento: new Date(pago_a_cuenta.fecha_vencimiento),
      });

      // Iterar sobre el array cuotas
      for (const cuota of cuotas) {
        // Almacenar en la tabla cuotas
        const nuevaCuota = await cuotasService.create({
          id_plan_pago: nuevoPlanPago.id,
          nro_cuota: cuota.nro_cuota,
          capital: cuota.capital,
        });

        // Iterar sobre el array vencimientos
        for (const vencimiento of cuota.vencimientos) {
          // Almacenar en la tabla vencimientos
          const nuevoVencimiento = vencimientosService.create({
            id_cuota: nuevaCuota.id,
            fecha_vencimiento: new Date(vencimiento.fecha_vencimiento),
            interes_financiero: vencimiento.interes_financiero,
            interes_resarcitorio: vencimiento.interes_resarcitorio,
            total: vencimiento.total
          });
        };
      };


      res.status(200).json({ message: "Plan de Pago creado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el Plan de Pago" });
    }
  },

  getVencimientoByPK: async (req, res) => {
    try {
      const idVencimiento = req.params.id;

      const vencimiento = await vencimientosService.getOneByPK(idVencimiento);

      if (!vencimiento) {
        return res.status(404).json({ message: "No se encontró el vencimiento [Mensaje desde el controller]" });
      }

      res.status(200).json(vencimiento);
    } catch (error) {
      res.status(500).json({ message: error});
    }
  }
  
}