const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const List = mongoose.model("List");

router.get("/list", (req, res) => {
    List.find()
        .then((lists) => {
            res.json({ lists: lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/list", (req, res) => {
    const { name, color } = req.body;

    if (!name || !color) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const list = new List({
        name,
        color,
    });

    list.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

module.exports = router;
