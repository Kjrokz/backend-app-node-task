const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { nombre } = req.body;

  try {
    //crear un proyecto
    /* let proyecto = await Proyecto.findOne({ nombre }); */
    let listaProyectos = await Proyecto.find({
      creador: req.usuario.id,
      nombre: nombre,
    });

    console.log(listaProyectos);

    if (Object.entries(listaProyectos).length !== 0) {
      return res
        .status(400)
        .json({ msg: "No puede haber 2 proyectos con el mismo nnombre" });
    }

    const proyecto = new Proyecto(req.body);
    /*     console.log(`ddddddddddddddd ${req}`);
    console.log(proyecto); */
    /*   console.log(JSON.stringify(req.usuario)); */

    proyecto.creador = req.usuario.id;

    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Huno un erro");
  }
};

//obtiene to los proyecto del us actu

exports.obtenerProyectos = async (req, res) => {
  try {
    /*   console.log(req.usuario.id); */
    const proyectos = await Proyecto.find({ creador: req.usuario.id });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).semd("huo un err");
  }
};

//actualiza un proyecto

exports.actualizarProyectos = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  //extraer la info del proyect

  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //revisar el id
    /*   console.log(req.params.id); */
    let proyecto = await Proyecto.findById(req.params.id);

    //si el proyecto existe

    if (!proyecto) {
      return res.status(404).json({ msg: "El proyecto no exist" });
    }

    //verificar el creador

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //actualizar

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });

    /*  const proyecto = await Proyecto.findById; */
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un err servi");
  }
};

// eliminar un proyecto

exports.elminarProyecto = async (req, res) => {
  try {
    //verificar el id
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: "El proyecto no exist" });
    }

    //verificr al creador

    /* console.log(proyecto.creador.toString()); */

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await Proyecto.findOneAndRemove({ _id: req.params.id });
    await Tarea.deleteMany({ proyecto: req.params.id });
    res.json({ msg: "proyect elimind" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error serv");
  }
};
