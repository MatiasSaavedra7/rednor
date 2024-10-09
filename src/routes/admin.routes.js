const { Router } = require("express");
const router = Router();

const controller = require("../controllers/adminController");

router.get("/usuarios", controller.getAll);

router.put("/usuarios/asignarRol", controller.asignarRol);

router.get("/prueba", (req, res) => {
  res.send("Ruta de prueba");
})

module.exports = router;
