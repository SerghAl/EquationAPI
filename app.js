`use strict`

const express = require(`express`);
const api_v1 = require(`./routes/api1`);

const app = express();

app.use(express.static(`./public`));

app.use(`/api/v1`, api_v1);

app.get(`/`, (req, res) => {res.sendFile(__dirname + `/views/index.html`)});

app.all(`/*`, (req, res) => {
    res.status(404);
    res.send(`This resource doesn't exist`);
});

app.listen(3000, () => {
    console.log(`Server is working on port 3000`);
});