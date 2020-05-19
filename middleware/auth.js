const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

module.exports = function (req, res, next) {
  //leer token del header

  const token = req.header("x-auth-token");
  console.log(token);
  //revisar si no hay tk
  if (!token) {
    return res.status(401).json({ msg: "no hay token , permiso no vald" });
  }

  //validar tk

  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    /* console.log(cifrado.foo); */
    /*     console.log(JSON.parse(cifrado)); */
    /*     console.log(JSON.parse(cifrado.usuario)); */

    console.log(cifrado);

    req.usuario = cifrado.usuario;
    /*   console.log(JSON.stringify(req.usuario)); */

    next();
  } catch (error) {
    res.status(401).json({ msg: "token no valido" });
  }
};
