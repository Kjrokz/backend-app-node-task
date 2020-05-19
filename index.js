/* console.log("asdad");


 */

const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// crear el servidor

const app = express();

conectarDB();

/* var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
 */
//habilitar cors
app.use(cors(/* corsOptions */));

//Habilitar expres.json
app.use(express.json({ extended: true }));

const port = process.env.port || 4000;

//importar rutas

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth")); //  autenticacion
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//Definir la pag principal
/* app.get("/", (req, res) => {
  res.send("fdsfsd ");
}); */

// arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`dsadasddasd ${port}`);
});
