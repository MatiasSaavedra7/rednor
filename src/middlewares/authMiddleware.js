const authMiddleware = (req, res, next) => {
  if (!(req.session.userLogged)) {
    return res.redirect('/usuarios/login');
  }
  if (req.session.userLogged.id_rol == 4) {
    return res.redirect('/autorizacion-pendiente');
  }
  next();
};

module.exports = authMiddleware;