var Project = require('../models/project')
var fs = require('fs')
var controller = {
    save : function(req,res){
        var project = new Project()
        var args = req.body
        project.name = args.name
        project.description = args.description
        project.year = args.year
        project.langs = args.langs
        project.image = null
        args.langs.split(',').forEach(lang => {
            console.log(lang)
        });
        project.save((err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,submitted:project})
            }
        })
    },
    
    get : function(req,res){
        var projectId = req.params.id
        Project.findById(projectId,(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,got:result})
            }
        })
    },

    getAll : function(req,res){
        Project.find({}).exec((err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,got:result})
            }
        })
    },

    update : function(req,res){
        var projectId = req.params.id
        var update = req.body


        Project.findByIdAndUpdate(projectId,update,{new:true},(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,now:result})
            }
        })
    },

    delete : function(req,res){
        var projectId = req.params.id

        Project.findByIdAndDelete(projectId,(err,result) => {
            if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,deleted:result})
            }
        })
    },

    uploadImage : function(req,res){
        var projectId = req.params.id
        var fileName = 'Imagen no encontrada'
        if(req.files){
            var filePath = req.files.image.path
            var fileName = filePath.split('\\')[1]
            var ext = fileName.split(".")[1]
            if(ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'gif'){
                Project.findByIdAndUpdate(projectId,{image:fileName},{new:true},(err,result) => {
                if(err){
                    return res.status(500)
                              .send({error:true,type:500})
                }else if(!result){
                    return res.status(404)
                              .send({error:true,type:404})
                }else{
                    return res.status(200)
                              .send({error:false,now:result})
                }
            })
            }else{
                fs.unlink(filePath,(err) => {
                    return res.status(500).send({error:true,type:500})
                })
            }
            
        }else{
            return res.status(404).send({error:true,type:404})
        }
    }
}
module.exports = controller

/*
if(err){
                return res.status(500)
                          .send({error:true,type:500})
            }else if(!result){
                return res.status(404)
                          .send({error:true,type:404})
            }else{
                return res.status(200)
                          .send({error:false,got:result})
            }
*/