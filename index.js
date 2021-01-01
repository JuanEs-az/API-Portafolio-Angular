var mongoose = require('mongoose')
var app = require('./app')
var port = 3700

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/portafolio',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión con el servidor establecida')
        //Escuchar servidor
        app.listen(port, () => console.log('Servidor está siendo escuchado en el puerto ' + port) )
        
    })
    .catch((err) => {
        console.log(err)
    })