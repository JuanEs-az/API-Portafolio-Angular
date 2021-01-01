var express = require('express')
var bodyParser = require('body-parser')

var app = express()

//Configuración de rutas
var projectRoutes = require('./routes/project')

//Middlewares
app.use(bodyParser.urlencoded({extended:false})) //Config del bodyparser
app.use(bodyParser.json()) //Convertir peticiones a json

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Cargar rutas
app.use('/',projectRoutes)

//Exportar
module.exports = app