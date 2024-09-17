module.exports = {
  mostrarGastos: async (req, res) => {
    res.render("gastos/main");
  },

  registroServicios: async (req, res) => {
    res.render("gastos/servicios/registroServicio");
  },

  tablaServicios: async (req, res) => {
    res.render("gastos/servicios/tablaServicios")
  }
};
