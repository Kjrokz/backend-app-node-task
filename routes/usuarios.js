//rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");

//Crea un usuario
//api/usuarios

router.post(
  "/",
  [
    check("nombre", "el nombre es oblig").not().isEmpty(),
    check("email", "agre un ema valid").isEmail(),
    check("password", "el pass debe ser min de 6 carac").isLength({ min: 6 }),
  ],

  usuarioController.crearUsuario
);

module.exports = router;
