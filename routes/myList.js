const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MyList = mongoose.model("MyList");
const requireToken = require("../middleware/requireToken");

router.get("/mylistGet", requireToken, (req, res) => {
    console.log(req.user);
    /* const user = ; */
    MyList.find({ userId: req.user._id })
        .then((lists) => {
            res.json({ lists: lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/mylist", requireToken, (req, res) => {
    const { name, color } = req.body;
    console.log(name, color);

    if (!name || !color) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const list = new MyList({
        name,
        color,
        userId: req.user._id,
    });

    list.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

router.delete("/deletemylist/:mylistId", (req, res) => {
    console.log("deletemylist");
    console.log(req.params.mylistId);
    MyList.findOne({ _id: req.params.mylistId }).exec((err, list) => {
        if (err || !list) {
            return res.status(422).json({ error: err });
        }
        list.remove()
            .then((result) => {
                console.log("tamam");
                res.json(result);
            })
            .catch((err) => {
                console.log(err);
            });
    });
});

module.exports = router;
