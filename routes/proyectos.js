const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//crea proyectos
//api/proyectos

router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obli").not().isEmpty()],
  proyectoController.crearProyecto
);

//obtener todos los proyectos

router.get("/", auth, proyectoController.obtenerProyectos);

//actualizar proyecto via id

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyc es oblg")],
  proyectoController.actualizarProyectos
);

//eliminar un proyecto
router.delete("/:id", auth, proyectoController.elminarProyecto);

module.exports = router;
