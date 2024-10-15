const moderatorMiddleware = (req, res, next) => {
  if (req.session.userLogged && req.session.userLogged.id_rol === 2) {
    //  El usuario es Moderador, permite el acceso
    next()
  } else {
    //  El usuario no es Moderador, redirige a la página principal
    res.send("Acceso Denegado");
    res.redirect("/")
  }
}

module.exports = moderatorMiddleware;