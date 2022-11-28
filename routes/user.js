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

router.delete('/deleteUser/:userId',requireToken,(req,res)=>{
    console.log("/deleteUser/:userId",req.params.userId)
    User.findOne({_id:req.params.userId})
    .exec((err,user)=>{
        if(err || !user){
            return res.status(422).json({error:err})
        }
        if(user._id.toString() === req.user._id.toString()){
              user.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})


module.exports = router;
