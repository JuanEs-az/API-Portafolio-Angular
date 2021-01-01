var express = require('express')
var projectController = require('../controllers/project')
var connectMultiparty = require('connect-multiparty')
var router = express.Router()


//middlewares 
var middlewares = {
    uploadFiles: connectMultiparty({uploadDir:'./uploads'})
}
//Aquí van las rutas
router.post('/save',projectController.save)
router.get('/project/:id',projectController.get)
router.get('/project',projectController.getAll)
router.put('/project/:id/update',projectController.update)
router.delete('/project/:id/delete',projectController.delete)
router.post('/project/:id/uploadImage',middlewares.uploadFiles,projectController.uploadImage)
//Exportamos
module.exports = router