const mongoose = require("mongoose");
const countrySchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

mongoose.model("Country", countrySchema);
