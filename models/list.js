const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    
})

mongoose.model("List",postSchema) 