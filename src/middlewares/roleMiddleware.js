const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (req.session.userLogged && roles.includes(req.session.userLogged.id_rol)) {
      //  Si el rol del usuario esta entre los permitidos, permitir el acceso
      next(); //  next() pasa el control al siguiente middleware
    } else {
      res.send("Acceso Denegado!");
    }
  }
}

module.exports = roleMiddleware;