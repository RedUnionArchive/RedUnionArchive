const express = require("express");
const app = express();
const addonInterface = require("./index");

app.get("/manifest.json", (req, res) => {
    res.send(addonInterface.manifest);
});

app.get("/:resource/:type/:id/:extra?.json", (req, res) => {
    addonInterface.get(req, res);
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Addon rodando em http://localhost:${port}/manifest.json`);
});
