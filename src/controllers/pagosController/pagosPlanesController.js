const fs = require('fs');
const path = require('path');

const pagosCuotasService = require("../../database/services/pagosCuotasService");

module.exports = {
  // Traer todos los Pagos
  getAll: async (req, res) => {
    try {
      res.send("[PAGOS] Planes de Pago & Moratorias");
    } catch (error) {
      res.send(error);
    }
  },

  // Traer todos los Pagos de un Plan de Pago & Moratoria
  getAllByPlanPago: async (req, res) => {
    try {
      const pagos = await pagosCuotasService.getAllByPlanPago(req.params.idPlanPago);
      res.send(pagos);
    } catch (error) {
      res.send(error);
    }
  },

  // Traer un Pago por su PK
  getOneByPK: async (req, res) => {
    try {
      const idPago = req.params.idPago;
      res.send(`[PAGOS] Detalles del Pago con ID: ${idPago}`);
    } catch (error) {
      res.send(error);
    }
  },

  create: async (req, res) => {
    try {
      const nuevoPago = req.body;
      console.log(nuevoPago);
    } catch (error) {
      res.send(error);
    }
  },

};