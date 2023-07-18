//ROUTERS (para reutilizar caminos)
const express = require('express')
const routerProgramacion = express.Router()
const {programacion} =require('../datos/cursos').infoCursos
const lodash = require('lodash') //usamos lodash para manejar mejor los arrays

routerProgramacion.use(express.json()/*middleware para analizar solicitudes en routerProgramacion con JSON 
y convertir a objetos accesibles a traves del req.body*/)

//con parametros url:

routerProgramacion.get('/:lenguaje', (req, res) => {

    const {lenguaje} = req.params
    const resultado = programacion.filter(curso => lodash.isEqual(curso.lenguaje,lenguaje))//devuelve un array con los true

    if(resultado.length===0){
      
      return res.status(404).send(`no se encontraron recursos de ${lenguaje}`)
      //return res.status(404).end() nos permite enviar cadena vacia
  }


  //  console.log(req.query.ordenar) //el query es ?clave=valor y ordenar seria el parametro clave
//    /api/cursos/programacion/java?ordenar=vistas
  if(lodash.isEqual (req.query.ordenar,'vistas') ){
    //para no repetir condigo en todas las rutas podemos crear una funcion y pasarle req,res,y resultado

    const ordenado = resultado.slice().sort((a, b) => b.vistas - a.vistas/*ordenamos elementos descendentemente*/) 
    //devuelve una copia del array original ordenado
    return res.send(ordenado) 
   

  }

  res.send(resultado) 

})

routerProgramacion.post('/' , (req,res)=>{
//index.http ...
  let cursoNuevo = req.body
  programacion.push(cursoNuevo)
  res.send(programacion)

})


routerProgramacion.put('/:id',(req,res)=>{ //en put debemos pasar toda la entidad completa
  //y el objeto que enviemos desde el cleinte debe representar todo esa entidad
//toda la info 
  const cursoActualizado = req.body
  const {id} = req.params

  const indice = programacion.findIndex(curso => curso.id == id)

  if(indice >= 0){

   programacion[indice] = cursoActualizado


  }

  res.send(programacion)

})



routerProgramacion.patch('/:id', function(req, res) {
//solo la info que queremos actualizar
  const infoActualizada = req.body
  const  {id} = req.params

  const indice = programacion.findIndex(curso => curso.id == id)

  if(indice >=0){
  
    const cursoAmodificar = programacion[indice]
    Object.assign(cursoAmodificar,infoActualizada)//actualizar cursoAmodificar con las nuevas propiedades
    //de infoActualizada

  }

  res.send(programacion)


})


routerProgramacion.delete('/:id', function(req, res) { //delete no necesita tener cuerpo

  const {id} = req.params

  //cuando sean mismo codigo podemos crear funcion 
  const indice = programacion.findIndex(curso => curso.id == id)

  if(indice >=0){
  
 programacion.splice(indice,1)
  } else {

    return res.status(404).send(`no se pudo realizar el delete para el id ${id} proporcionado`)

  }

  res.send(programacion)

})


module.exports = routerProgramacion