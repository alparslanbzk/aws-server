const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tr: {
        type: String,
        required: true,
    },
});

mongoose.model("Videos", postSchema);
//https://stackoverflow.com/questions/48787720/how-to-structure-various-interdependent-schemas-in-mongoose-or-how-to-use-refer
