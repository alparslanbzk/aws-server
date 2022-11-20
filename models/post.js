const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    video_url:{
        type:String,
        required:true
    },
    photo_url:{
        type:String,
        //required:true
    },
    words:[{
        word_name:{type:String},
        word_language:{type:String}
       }]

},{timestamps:true})

mongoose.model("Post",postSchema) 
//https://stackoverflow.com/questions/48787720/how-to-structure-various-interdependent-schemas-in-mongoose-or-how-to-use-refer