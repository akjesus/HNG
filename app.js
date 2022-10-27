const express = require('express');
const app = express();
var http = require('http');


const port = 3000;
const server = app.listen(port, () => {
  console.log(
    `HNG App is running at port: ${port}`
  );
});

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