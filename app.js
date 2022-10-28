const express = require('express');
const app = express();
const dotenv = require('dotenv');
var http = require('http');

dotenv.config({ path: './config.env' });
const PORT = 3000;
const server = app.listen((process.env.PORT || 3000), () => {
  console.log(`HNG App is running at port: ${PORT} in ${process.env.ENV} mode`);
});

app.get("/", (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    result = {
        slackUsername: "akjesus",
        backend: true,
        age: 31,
        bio: "Aspiring Backend Dev",
    }
    var payload = JSON.stringify(result);
    res.status(200).send(payload);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled Error! Application is shutting down!');
    server.close(() => {
      process.exit(1);
    });
  });
  
  process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED! Application is shutting down!');
    server.close(() => {
      console.log('Process Terminated!');
    });
  });
  