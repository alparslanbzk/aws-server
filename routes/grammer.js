const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Grammer = mongoose.model("Grammer");
const Shorts = mongoose.model("Shorts");
const Phrases = mongoose.model("Phrases");

router.get("/grammer", (req, res) => {
    Grammer.find()
        .then((lists) => {
            res.json({ lists: lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/grammer", (req, res) => {
    const { name, color, regex, tenses, free } = req.body;
    console.log(name, color);

    if (!name || !color || !regex || !tenses || !free) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const list = new Grammer({
        name,
        color,
        regex,
        tenses,
        free,
    });

    list.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

router.post("/search-grammer", (req, res) => {
    const { regex } = req.body;
    console.log(regex);

    Phrases.find({
        $and: [
            {
                text: {
                    $regex: regex,
                    $options: "i",
                },
            },
        ],
    })
        .select("_id tr text number")
        .limit(200)
        .then((posts) => {
            var count = posts.length;
            res.json({ count, posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/search-grammer-fake", (req, res) => {
    console.log("hello");
    //( )(cup of tea|some money|any bread|many chairs|much milk|some friends|a man|a dog|any seats|any coffee|an email|any sugar|some chocolate|some glasses|lots of apples|a lot of snow|a lot of money|many potatoes|much water)( )
    /* Shorts.find({
        video_text: {
            $regex: "(I|You|He|She|It|They|We) (will have) (confessed|crossed|dressed|embarrassed|guessed|impressed|increased|missed|passed|promised|announced|danced|forced|influenced|introduced|noticed|reduced|brushed|crashed|punished|pushed|rushed|matched|punched|reached|searched|laughed|fixed|relaxed|accepted|appreciated|cheated|connected|excited|interrupted|invented|rejected|started|waited|avoided|decided|ended|expanded|guarded|included|needed|pretended|reminded|succeeded|appeared|compared|considered|entered|remembered|arrived|received|observed|improved|saved|advised|buzzed|paused|raised|sneezed|killed|pulled|traveled|claimed|jammed|burned|examined|explained|turned|warned|borrowed|annoyed|cried|glued|carried|weighed|robbed|scrubbed|belonged|hugged|arranged|encouraged|challenged|judged|managed|awaken|beaten|begun|bitten|blown|broken|brought|built|bought|caught|chosen|come|cost|cut|done|dealt|dug|dreamt|drawn|drunk|driven|eaten|fallen|fed|felt|fought|found|flown|forgotten|forgiven|frozen|gotten|given|gone|grown|hung|had|heard|hidden|hit|held|hurt|kept|known|laid|led|left|lent|let|lain|lost|made|meant|met|paid|put|quit|read|ridden|rung|risen|run|said|seen|sought|sold|sent|set|sewn|shaken|shone|shot|shown|sung|sunk|sat|slept|slid|spoken|spent|spread|stood|stolen|stuck|stricken|sworn|swept|swollen|swum|swung|taken|taught|torn|told|thought|worn|wept|won|written)",
            $options: "i",
        },
    })

        .then((posts) => {
            var count = posts.length;
            res.json({ count, posts });
        })
        .catch((err) => {
            console.log(err);
        });
 */
    Phrases.find({
        text: {
            $regex: "(will) (I|You|He|She|It|They|We) (have) (asked|checked|kicked|liked|looked|talked|thanked|walked|worked|confessed|crossed|dressed|embarrassed|guessed|impressed|increased|missed|passed|promised|announced|danced|forced|influenced|introduced|noticed|reduced|brushed|crashed|punished|pushed|rushed|matched|punched|reached|searched|laughed|fixed|relaxed|accepted|appreciated|cheated|connected|excited|interrupted|invented|rejected|started|waited|avoided|decided|ended|expanded|guarded|included|needed|pretended|reminded|succeeded|appeared|compared|considered|entered|remembered|arrived|received|observed|improved|saved|advised|buzzed|paused|raised|sneezed|killed|pulled|traveled|claimed|jammed|burned|examined|explained|turned|warned|borrowed|annoyed|cried|glued|carried|weighed|robbed|scrubbed|belonged|hugged|arranged|encouraged|challenged|judged|managed|awaken|beaten|begun|bitten|blown|broken|brought|built|bought|caught|chosen|come|cost|cut|done|dealt|dug|dreamt|drawn|drunk|driven|eaten|fallen|fed|felt|fought|found|flown|forgotten|forgiven|frozen|gotten|given|gone|grown|hung|had|heard|hidden|hit|held|hurt|kept|known|laid|led|left|lent|let|lain|lost|made|meant|met|paid|put|quit|read|ridden|rung|risen|run|said|seen|sought|sold|sent|set|sewn|shaken|shone|shot|shown|sung|sunk|sat|slept|slid|spoken|spent|spread|stood|stolen|stuck|stricken|sworn|swept|swollen|swum|swung|taken|taught|torn|told|thought|worn|wept|won|written) (?)",
            $options: "i",
        },
    })
        .select("_id tr text number")
        .limit(250)
        .then((posts) => {
            var count = posts.length;
            res.json({ count, posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
