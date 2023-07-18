const express = require('express')
const app = express()
const puerto = process.env.PORT || 3000 //si el valor del puerto esta definido como una variable en el ambiente
//donde se esta ejecutando esa aplicacion node 
const {infoCursos} =require('./datos/cursos')
const lodash = require('lodash') //usamos lodash para manejar mejor los arrays




const routerCursos = require('./routers/routerCursos')
app.use('/api/cursos', routerCursos) //le dice a express que use un camino o path especifico base y 
//lo asocie a un router especifico


const routerProgramacion = require('./routers/routerProgramacion')
app.use('/api/cursos/programacion', routerProgramacion) 




//ROUTING
//creando rutas
app.get('/', (req,res)=>{//metodo y camino
 
    //que va a pasar cuando haya una solicitud get en el path definido
    res.send('mi servidor con express')



})


app.get(['/api/cursos/programacion', '/api/cursos/matematicas'], (req, res) => {

    const {url}=req


    switch (url) {
        case '/api/cursos/programacion':
          res.send(infoCursos.programacion)
          //console.log(infoCursos['programacion'])
          break
        case '/api/cursos/matematicas':
          res.send(infoCursos.matematicas)
          break
        default:
          res.status(404).send('Recurso no encontrado')
      }
 
})

/*otra forma:

app.get('/api/cursos/:curso', (req, res) => {
  const cursosPermitidos = ['programacion', 'matematicas']
  const curso = req.params.curso.toLowerCase()
  if (cursosPermitidos.includes(curso)) {
    res.send(infoCursos[curso])
  } else {
    res.status(404).send('Recurso no encontrado')
  }
})


*/

app.get('/api/cursos/matematicas/:tema', (req, res) => {

    const {tema} = req.params
    const resultado = infoCursos.matematicas.filter(curso => lodash.isEqual(curso.tema,tema))//devuelve un array con los true

    if(resultado.length>0)
    {res.send(resultado)}
    else
    {return res.status(404).send(`no se encontraron recursos de ${lenguaje}`)}


})

app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res) => {

  const {lenguaje,nivel} = req.params

  const resultado=infoCursos.programacion.filter(curso=> lodash.isEqual(curso.lenguaje,lenguaje) && lodash.isEqual(curso.nivel,nivel) )

  if(resultado.length>0)
  {res.send(resultado)}
  else
  {return res.status(404).send(`no se encontraron recursos de ${lenguaje} de nivel ${nivel}`)}


})




//para que escuche todas las solicitudes en el servidor puerto 3000

app.listen(puerto , ()=>{

    console.log(`el servidor esta escuchando en el puerto ${puerto}`)

})







