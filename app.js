const express = require('express');
const app = express();
const port = 3002;
const server = app.listen(port, () => console.log("Server listening on port " + port));
var http = require('http');


app.get("/", (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    result = {
        slackUsername: "akjesus",
        backend: true,
        age: 36,
        bio: "Aspiring Backend Dev",

    }

    var payload = JSON.stringify(result);
    res.status(200).send(payload);
})