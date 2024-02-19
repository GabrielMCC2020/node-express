const express = require('express');

const { programacion } = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

//MIDDLEWARE
routerProgramacion.use(express.json());

routerProgramacion.get('/', (req, res) => {
  res.send(JSON.stringify(programacion));
// res.json(programacion); //otra forma sin JSON.stringify de arriba 
});

routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}.`);
  }
  // console.log(req.query.ordernar);
  if (req.query.ordernar === 'vistas') {
    return res.send(JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas)));
  }
  res.send(JSON.stringify(resultados));
  // const {id} = req.params;
  // const {programacion} = infoCursos;
  // const curso = programacion.find(curso => curso.id === Number(id));
  // res.send(JSON.stringify(curso));
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;

  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

  if (resultados.length === 0) {
  // return res.status(404).end();
    return res.status(204).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}.`);
  }
  res.send(JSON.stringify(resultados));

  // const { lenguaje, nivel } = req.params;
  // const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
  // if (resultados.length === 0) {
  //   return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}.`);
  // }
  // res.send(JSON.stringify(resultados));
});

routerProgramacion.post('/', (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.send(JSON.stringify(programacion));
});

routerProgramacion.put('/:id', (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
  } // else {
  // res.status(404).send(`No se encontro el curso con el id ${id}`);
  // }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.patch('/:id', (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.delete('/:id', (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice >= 0) {
    programacion.splice(indice, 1);
  }
  res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;
