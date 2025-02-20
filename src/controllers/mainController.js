module.exports = {
  index: (req, res) => {
    // Informacion del Usuario Conectado
    // const user = req.session.userLogged;
    // console.log("Informacion del Usuario: ", user);
    
    res.render("main");
  },

  autorizacionPendiente: async (req, res) => {
    try {
      if (req.session.userLogged && req.session.userLogged.id_rol === 4) {
        return res.render("usuarios/autorizacionPendiente", { user: req.session.userLogged });
      }

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};
