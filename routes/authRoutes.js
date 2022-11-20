const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const { jwtkey } = require("../keys");

router.post("/signup", async (req, res) => {
    //console.log(req.body);
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res
                    .status(422)
                    .json({ error: "user already exists with that email" });
            }

            try {
                const user = new User({ email, password });
                user.save();
                const token = jwt.sign({ userId: user._id }, jwtkey);

                res.send({ token });
            } catch (err) {
                return res.json({ error: "Invalid Email or password" });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/signin", async (req, res) => {
    console.log("signin");
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Invalid Email or password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).json({ error: "Invalid Email or password" });
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, jwtkey);

        res.send({ token });
    } catch (err) {
        returnres.status(422).json({ error: "Invalid Email or password" });
    }
});

module.exports = router;
