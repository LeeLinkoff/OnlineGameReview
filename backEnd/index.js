// Modules and Globals
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Express Settings
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("query parser", "simple");

// Controllers & Routes

app.use(express.urlencoded({ extended: true }));

app.use("/games", require("./controllers/games"));

app.listen(process.env.PORT, (err) => {
    if (err) console.log("error in server set up: " + err )
  console.log( `start server, Listening on ${process.env.PORT}`);
});express.query.p