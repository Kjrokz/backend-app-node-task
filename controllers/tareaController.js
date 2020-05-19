const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  //comprobar si el proyecto exis

  //extrraer proy

  try {
    const { proyecto, nombre } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "el proy no exs" });
    }

    //revisar si el ususario actual pertenece al ususario auntent

    /*     const usuarioProyecto = await Proyecto.find({
      creador: req.usuario.id,
      _id: proyecto,
    }); */

    /* if (!usuarioProyecto) {
      return res.status(401).json({ msg: "el ususa no pertenec al proyect" });
    } */

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      res.status(401).json({ msg: "el usuar nmo pert al proy" });
    }

    let tareaNueva = await Tarea.find({ proyecto: proyecto, nombre: nombre });

    if (Object.entries(tareaNueva).length !== 0) {
      return res
        .status(400)
        .json({ msg: "no pueden haber 2 tareas con el mismo nombre" });
    }

    tareaNueva = new Tarea(req.body);

    await tareaNueva.save();

    res.json({ tareaNueva });
  } catch (error) {
    console.log(error);
    res.status(500).send("hub un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.query;

    console.log(req.body);

    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "pro no encontr" });
    }

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tareas = await Tarea.find({ proyecto: proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("hg un err");
  }
};

exports.actualizarTarea = async (req, res) => {
  //extraer la info del proyecto

  /*   const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ msg: "el nombre es requerido" });
  } */

  try {
    const { proyecto, nombre, estado } = req.body;

    //ver si existe
    const tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msng: "tarea no exist" });
    }

    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //crear objeto new inf

    const tareaNueva = {};

    tareaNueva.nombre = nombre;

    tareaNueva.estado = estado;

    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id },
      tareaNueva,
      { new: true }
    );

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("h un err");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    //ver si existe
    /*  const { proyecto } = req.body; */
    const { proyecto } = req.query;

    const tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msng: "tarea no exist" });
    }

    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "tarea elimin" });
  } catch (error) {
    console.log(error);
    res.status(500).send("h un err");
  }
};
