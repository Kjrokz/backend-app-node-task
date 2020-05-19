//rutas para crear usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
/* const cors = require("../middleware/cors"); */

//api/auth

router.post(
  "/",
  [
    check("email", "agre un ema valid").isEmail(),
    check("password", "el pass debe ser min de 6 carac").isLength({ min: 6 }),
  ],
  /*   usuarioController.crearUsuario */
  authController.autenticarUsuario
);

//devuelve el us aut
router.get("/", auth, authController.obtenerUsuario);
module.exports = router;
