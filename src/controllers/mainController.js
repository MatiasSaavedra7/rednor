module.exports = {
  index: (req, res) => {
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
