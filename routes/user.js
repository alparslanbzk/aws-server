const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const requireToken = require("../middleware/requireToken");

/* const Shorts = mongoose.model("Shorts");
 */

router.get("/myuser", requireToken, (req, res) => {
    console.log("myuser", req.user._id);
    //res.send("Home")
    User.find({ _id: req.user._id })
        .then((user) => {
            res.json({ user });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
