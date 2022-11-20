const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { MONGOURI } = require("./keys.js");
var cors = require("cors");
app.use(cors());

require("./models/post");
require("./models/list");
require("./models/word");
require("./models/shorts");
require("./models/users");
require("./models/myList");
require("./models/myWord");
require("./models/grammer");
require("./models/phrases");
require("./models/videos");

const PORT = 5000;

app.use(express.json());

const requireToken = require("./middleware/requireToken");

app.use(require("./routes/word"));
app.use(require("./routes/post"));
app.use(require("./routes/list"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/mylist"));
app.use(require("./routes/grammer"));
app.use(require("./routes/myWord"));
app.use(require("./routes/phrases"));
app.use(require("./routes/user"));

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("mongoose çalışıyor");
});

mongoose.connection.on("error", (err) => {
    console.log("mongoose çalışmıyor", err);
});

app.get("/hebele", requireToken, (req, res) => {
    //res.send("your email is" + req.user.email);
    res.json({ user: req.user._id });
});

app.listen(PORT, () => {
    console.log("Server running on ", PORT);
});
