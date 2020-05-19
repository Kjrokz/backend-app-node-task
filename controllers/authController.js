const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  //extraer email y pas

  const { email, password } = req.body;

  try {
    //que sea un usuario reg

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: "el usuario no exis" });
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    console.log(passCorrecto);

    if (!passCorrecto) {
      return res.status(400).json({ msg: "passwo incorrc" });
    }

    //crear firm jwt

    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //fimra jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.status(400).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("adasad");
  }
};

//obti usu utent

exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json({ usuario: usuario });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hub un error");
  }
};
