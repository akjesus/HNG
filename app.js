const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
var http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const url = require("url");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());
app.options("*", cors());

//use helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again in 15 minutes", //message when rate reached
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  result = {
    slack_name: "akjesus",
    current_day: weekday[new Date(Date.now()).getDay()],
    utc_time: new Date(Date.now()),
    track: "backend",
    github_file_url: path.dirname(__filename),
    github_repo_url: __filename,
  };
  res.status(200).send(result);
});

app.post("/:string", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  var string = req.params.string;
  if (!string) return res.status(400).send("Invalid String sent");
  var payload = {};
  payload.slackUsername = "akjesus";
  payload.result = parse(string);
  JSON.stringify(payload);
  res.status(200).send(payload);
});

app.post("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  var url_parts = url.parse(req.url, true);
  if (url_parts.query.operation_type) {
    var query = url_parts.query;
    const operation_type = query.operation_type.toLowerCase();
    const xInt = parseInt(query.x);
    const yInt = parseInt(query.y);
    const payload = operation(operation_type, xInt, yInt);
    console.log("Payload from request query is");
    console.log(payload);
    return res.status(200).send(payload);
  } else {
    if (!req.body.operation_type) {
      const errorMessage = "Error! Invalid query sent, please try again";
      return res.status(400).send(errorMessage);
    }

    const operation_type = req.body.operation_type.toLowerCase();
    const xInt = parseInt(req.body.x);
    const yInt = parseInt(req.body.y);

    const payload = operation(operation_type, xInt, yInt);
    console.log("Payload from request body is");
    console.log(payload);
    res.status(200).send(payload);
  }
});

function operation(operation_type, x, y) {
  var payload = {};
  payload.slackUsername = "akjesus";
  if (operation_type.length > 14) {
    var myArray = operation_type.split(" ");
    if (
      myArray.includes("add") ||
      myArray.includes("addition") ||
      myArray.includes("sum")
    ) {
      payload.operation_type = "addition";
      payload.result = add(x, y);
      return payload;
    }

    if (
      myArray.includes("multiply") ||
      myArray.includes("times") ||
      myArray.includes("product")
    ) {
      payload.operation_type = "multiplication";
      payload.result = multiply(x, y);
      return payload;
    }
    if (
      myArray.includes("subtract") ||
      myArray.includes("remove") ||
      myArray.includes("minus")
    ) {
      payload.operation_type = "subtraction";
      payload.result = subtract(x, y);
      return payload;
    }
  } else {
    if (operation_type == "addition") {
      payload.operation_type = operation_type;
      payload.result = add(x, y);
      return payload;
    }

    if (operation_type == "subtraction") {
      payload.operation_type = operation_type;
      payload.result = subtract(x, y);
      return payload;
    }

    if (operation_type == "multiplication") {
      payload.operation_type = operation_type;
      payload.result = multiply(x, y);
      return payload;
    } else {
      payload = "Please refine your search parameters and try again!";
      return payload;
    }
  }
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}

// SERVER
module.exports = app;
