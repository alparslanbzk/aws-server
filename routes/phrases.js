const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Phrases = mongoose.model("Phrases");
const Videos = mongoose.model("Videos");

router.get("/phrases", (req, res) => {
    console.log(req.query.page);
    const page = req.query.page;
    console.log("hello");
    /* Phrases.find()
        .select("text _id tr")
        .limit(100)
        .then((posts) => {
            console.log(posts);
            res.json({ posts: posts });
        })
        .catch((err) => {
            console.log(err);
        }); */
    const language = "$" + "tr";
    Phrases.aggregate([
        {
            $group: {
                _id: "$_id",
                text: { $push: "$text" },
                number: { $push: "$number" },

                tr: { $push: language },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: "$_id",
                text: 1,
                tr: 1,
                number: 1,
                total: { $sum: 1 },
            },
        },
        { $skip: (page - 1) * 5 },
        { $limit: 50 },
    ])
        .then((posts) => {
            /* console.log(posts); */
            res.json({ posts: posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/aa", (req, res) => {
    console.log("buralo", req.query.word);
    /* Videos.find()
        .then((posts) => {
            res.json({ posts: posts });
        })
        .catch((err) => {
            console.log(err);
        }); */
    const page = req.query.page;

    console.log("buralo");
    Videos.aggregate([
        {
            $group: {
                _id: "$_id",
                text: { $push: "$text" },
                number: { $push: "$number" },
                tr: { $push: "$tr" },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: "$_id",
                text: 1,
                tr: 1,
                number: 1,
                total: { $sum: 1 },
            },
        },
        { $skip: (page - 1) * 50 },
        { $limit: 50 },
    ])
        .then((posts) => {
            console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", posts);
            res.json({ posts: posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
