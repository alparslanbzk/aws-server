const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Shorts = mongoose.model("Shorts");
const Phrases = mongoose.model("Phrases");
const Videos = mongoose.model("Videos");

router.get("/", (req, res) => {
    console.log("Home");
    res.send("Home");
});

router.get("/allpost", (req, res) => {
    console.log("buralo", req.query.word);
    Post.find()
        .then((posts) => {
            res.json({ posts: posts });
        })
        .catch((err) => {
            console.log(err);
        });
});
//https://stackoverflow.com/questions/42492431/mongoose-random-documents-non-sequential
/* router.get("/shorts", (req, res) => {
    Shorts.find()
        .limit(100)
        .then((posts) => {
            console.log(posts);
            res.json({ posts: posts });
        })
        .catch((err) => {
            console.log(err);
        });
}); */

router.post("/search-users", (req, res) => {
    console.log("bura2", req.body.params.text);
    //res.send("hello")
    var name = "yeni Jenna Wortham:";

    let userPattern = new RegExp("^" + name + "$");
    console.log(userPattern);
    Post.find({ title: new RegExp(req.body.params.text, "i") })
        //Post.find({title:{$regex:userPattern}})
        //.select("_id text")

        .then((posts) => {
            console.log("bura4 post", posts);
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/search-shorts", (req, res) => {
    console.log("hello");

    Phrases.find({
        text: new RegExp(" " + req.body.text + " ", "i"),
    })
        .select("_id tr text number")

        .limit(75)
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/discover-shorts", (req, res) => {
    console.log(req.body.text);


    Phrases.find({
        text: new RegExp(" " + req.body.text + " ", "i"),
    })
        .select("_id tr text number")

        .limit(75)
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/post", (req, res) => {
    const { title, video_url, words } = req.body;

    if (!title || !video_url || !words) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const post = new Post({
        title,
        video_url,
        words,
    });

    post.save()
        .then((post) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

module.exports = router;
