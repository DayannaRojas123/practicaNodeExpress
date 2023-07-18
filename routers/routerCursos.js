//ROUTERS (para reutilizar caminos)
const express = require('express')
const routerCursos = express.Router()
const {infoCursos} =require('../datos/cursos')

routerCursos.get('/',(req,res)=>{ //aqui usamos el router que creamos

    res.json(infoCursos) //para enviar json
    
    })

module.exports = routerCursos