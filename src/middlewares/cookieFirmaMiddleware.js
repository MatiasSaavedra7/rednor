const cookieFirmaMiddleware = (req, res, next) => {
  const firma = req.cookies.firma;

  if (!firma) {
    res.redirect("/");
  }

  next();
}

module.exports = cookieFirmaMiddleware;