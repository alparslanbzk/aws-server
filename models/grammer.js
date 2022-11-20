const mongoose = require("mongoose");
const grammerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        regex: {
            type: String,
            required: true,
        },
        tenses: {
            type: String,
            required: true,
        },
        free: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

mongoose.model("Grammer", grammerSchema);
