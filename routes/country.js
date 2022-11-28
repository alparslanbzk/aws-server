const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Country = mongoose.model("Country");

router.get("/country", async (req, res) => {
    //console.log(req.body);
    const { language } = req.body;

    Country.findOne({ language: language })
        .then((lang) => {
            res.send({ lang });
            
        })
        .catch((err) => {
            console.log(err);
        });
});


router.post("/country", (req, res) => {
    const {code, language, image } = req.body;

    if (!code || !language || !image) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const lang = new Country({
        code,
        language,
        image
    });

    lang.save()
        .then((lang) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

module.exports = router;
