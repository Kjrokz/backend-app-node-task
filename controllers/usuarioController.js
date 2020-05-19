const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  /*   console.log("desd ce fd");
  console.log(req.body); */

  //revisar si hay error

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "hay un us con mismo em" });
    }

    //crea usuario
    usuario = new Usuario(req.body);

    //contraseña has

    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar el nuevo usuario

    await usuario.save();

    //crear y fir jwt

    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //firm jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 }, //1 hora
      (error, token) => {
        if (error) throw error;

        return res.status(400).json({ token });
      }
    );

    //mensaje conf
    /*  res.status(400).json({ msg: "ususario c corr" }); */
  } catch (error) {
    console.log(error);
    res.status(400).send("dsaddd d");
  }
};
