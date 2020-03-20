const express = require("express");
const path = require("path");
const hoganExpress = require("hogan-express");
const bodyParser = require("body-parser");

// Express set up
let app = express();

app.engine("html", hoganExpress);
app.set("view engine", "html");
app.use(express.static("./dist"));
app.use(bodyParser.json());

// Serve static react site
app.get("*", (req, res) => void res.sendFile(path.join(__dirname, "./dist", "index.html")));

// Serve that ish
const port = process.env.PORT || 80;

app.listen(port);

console.log("I am Server. Hear me listening on port: " + port);