const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    video_id: {
        type: String,
        required: true,
    },
    video_text: {
        type: String,
        required: true,
    },
    video_tr: {
        type: String,
        required: true,
    },
});

mongoose.model("Shorts", postSchema);
//https://stackoverflow.com/questions/48787720/how-to-structure-various-interdependent-schemas-in-mongoose-or-how-to-use-refer
