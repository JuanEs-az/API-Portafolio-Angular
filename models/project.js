var mongoose = require('mongoose')
var schema = mongoose.Schema
 
var projectSchema = schema({
    name:String,
    description:String,
    year:Number,
    langs:String,
    image:String
})
module.exports = mongoose.model("project",projectSchema)