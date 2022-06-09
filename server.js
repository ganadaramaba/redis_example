
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const string = require("./router/string");
app.use("/string", string);

const list = require("./router/list");
app.use("/list", list);

const set = require("./router/set");
app.use("/set", set);

const sortedSet = require("./router/sortedSet");
app.use("/sortedSet", sortedSet);

const hash = require("./router/hash");
app.use("/hash", hash);

app.listen(port, async (req, res) => {
    console.log("서버 실행");
});