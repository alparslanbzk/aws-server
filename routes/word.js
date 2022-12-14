const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Word = mongoose.model("Word");
const MyWord = mongoose.model("Word");

/* const Shorts = mongoose.model("Shorts");
 */

//https://stackoverflow.com/questions/70994543/mongoose-get-documents-where-id-does-not-exist-inside-nested-object
//https://stackoverflow.com/questions/36726166/mongoose-find-all-items-with-id-from-an-array-that-do-exist
router.get("/word", (req, res) => {
    //res.send("Home")
    console.log(req.query.id);
    const page = req.query.page;
    console.log("sayfa",page)

    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name color")
        .skip(page*100)
        .limit(100)
        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/word2", (req, res) => {
    //res.send("Home")
    console.log(req.query.id);
    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name color")
        .then((word) => {
            var count = word.length;
            res.json({ word,count });
        })
        .catch((err) => {
            console.log(err);
        });
});
/* router.get("/shorts", (req, res) => {
    //res.send("Home")
    Shorts.find()
        .limit(10)
        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
}); */

router.post("/word", (req, res) => {
    const { word, translate } = req.body;
    
    if (!word || !translate) {
        return res.status(404).json("Lütfen gerekli alanları doldurunuz");
    }

    //console.log(req)

    //console.log(req.user)

    const words = new Word({
        word,
        translate,
        listedBy: req.body.listedBy,
    });

    words
        .save()
        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
