const adminMiddleware = (req, res, next) => {
  if (req.session.userLogged && req.session.userLogged.id_rol === 1) {
    //  El usuario es Administrador, permite el acceso
    return next();
  }
  //  El usuario no es Administrador, redirige a la página principal
  return res.redirect("/")
}

module.exports = adminMiddleware;