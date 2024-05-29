const { Router } = require("express");
const router = Router();

router.get("/prueba", (req, res) => {
  let mensaje = req.body.prueba
  if (mensaje) {
    res.send(mensaje);
  } else {
    res.send("No se envio un mensaje de prueba")
  }
});

module.exports = router;
