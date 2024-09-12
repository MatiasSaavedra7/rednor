const ingresosService = require("../database/services/ingresosService");
const equiposService = require("../database/services/equiposService");
const egresosService = require("../database/services/egresosService");
const informesService = require("../database/services/informesService");

module.exports = {
  taller: async (req, res) => {
    try {
      let ingresos = await ingresosService.getAll();

      let ingresosEnTaller = ingresos.filter(
        (ingreso) => ingreso.id_estado == 1 || ingreso.id_estado == 2
      );
      // let ingresosEnEspera = ingresos.filter(
      //   (ingreso) => ingreso.id_estado == 2
      // );
      let ingresosHistorial = ingresos.filter(
        (ingreso) => ingreso.id_estado == 3 || ingreso.id_estado == 4 || ingreso.id_estado == 5 || ingreso.id_estado == 6
      );
      res.render("taller/internos/taller", {
        ingresos,
        ingresosEnTaller,
        // ingresosEnEspera,
        ingresosHistorial,
      });
    } catch (error) {
      console.log(error);
    }
  },

  detalle: async (req, res) => {
    try {
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      let egreso = await egresosService.getOneByIdIngreso(ingreso.id);
      let informes = await informesService.getAllByIdIngreso(ingreso.id);
      console.log(informes);

      res.render("taller/internos/detalleTaller", {
        ingreso,
        egreso,
        informes,
      });
    } catch (error) {
      console.log(error);
    }
  },

  ingreso: async (req, res) => {
    try {
      let equipo = await equiposService.getOneByPK(req.params.id);
      res.render("taller/internos/ingreso", { equipo });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarIngreso: async (req, res) => {
    try {
      let data = {
        ...req.body,
        id_equipo: req.params.id,
        id_estado: 1,
        fecha_ingreso: new Date(),
      };

      // console.log(req.body);

      let ingreso = await ingresosService.create(data);

      if (ingreso) {
        // Actualizo el estado del Equipo a 'En Taller'
        await equiposService.updateByPK(ingreso.id_equipo, { id_estado: 4});

        // Redirigir al usuario al detalle del ingreso
        res.redirect(`/taller/detalle/${ingreso.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  egreso: async (req, res) => {
    try {
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      let equipo = await equiposService.getOneByPK(ingreso.id_equipo);
      res.render("taller/internos/egreso", { ingreso, equipo });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarEgreso: async (req, res) => {
    try {
      let data = {
        ...req.body,
        id_ingreso: req.params.id,
        fecha_egreso: new Date(),
      };

      console.log("_________");
      
      console.log(req.body);

      let egreso = await egresosService.create(data);

      if (egreso) {
        let ingreso = await ingresosService.getOneByPK(req.params.id);

        // Analizo el estado seleccionado desde los radio inputs
        if (req.body.estado == "Disponible") {
          //  Actualizo el estadoe del Ingreso a 'Listo para retirar'
          await ingresosService.updateByPK({ id_estado: 3 }, ingreso.id);
          
          // Actualizo el estado del Equipo a 'Disponible'
          // await equiposService.setEstadoDisponible(ingreso.id_equipo);
          await equiposService.updateByPK(ingreso.id_equipo, {id_estado: 1});
        } else {
          // Si es falso, entonces actualizo el estado del ingreso a 'Sin Arreglo'
          await ingresosService.updateByPK({ id_estado: 6 }, ingreso.id);

          // Actualizo el estado del Equipo a 'Sin Arreglo0
          await equiposService.updateByPK(ingreso.id_equipo, { id_estado: 5});
        }
        
        // Redirigir al usuario a la pagina de detalle del ingreso
        res.redirect(`/taller/detalle/${egreso.id_ingreso}`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  informe: async (req, res) => {
    try {
      let ingreso = await ingresosService.getOneByPK(req.params.id);
      res.render("taller/internos/informe", { ingreso });
    } catch (error) {
      console.log(error);
    }
  },

  almacenarInforme: async (req, res) => {
    try {
      let data = {
        ...req.body,
        id_ingreso: req.params.id,
        fecha_informe: new Date(),
      };

      await informesService.create(data);

      // Analizo si se hizo un pedido de insumos
      if (req.body.pedidoInsumos) {
        // Si es verdadero, entonces actualizo el estado del ingreso a 'En espera de insumos'
        await ingresosService.updateByPK({ id_estado: 2 }, req.params.id);
      }

      // Redirecciono al detalle
      res.redirect(`/taller/detalle/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
