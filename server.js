
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, async (req, res) => {
    console.log("서버 실행");
});