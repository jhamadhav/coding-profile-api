const express = require("express");
const { codechefProfile, codeforcesProfile, leetcodeProfile } = require("./codingProfile")
const app = express();
var cors = require('cors')

// port infos
const port = process.env.PORT || 8000;

// parser
app.use(express.static("public"));
app.use(express.json());
app.use(cors())

app.get("/", (request, response) => {
    response.sendFile(__dirname + "../public/index.html");
});

app.get("/hello", (req, res) => {
    res.send(JSON.stringify({ data: "hello world !" }))
})

app.post("/codeforces", async (req, res) => {
    data = req.body
    let username = null
    try {
        username = data["username"]
    } catch (e) {
        console.log(e)
        res.send(JSON.stringify({ data: null }))
        return
    }
    let cf = await codeforcesProfile(username)
    res.send(JSON.stringify({ data: cf }))
})
app.post("/leetcode", async (req, res) => {
    data = req.body
    let username = null
    try {
        username = data["username"]
    } catch (e) {
        console.log(e)
        res.send(JSON.stringify({ data: null }))
        return
    }
    let lc = await leetcodeProfile(username)
    res.send(JSON.stringify({ data: lc }))
})

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

