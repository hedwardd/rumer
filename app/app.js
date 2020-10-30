const express = require("express");
const setRoutes = require("./routes.js");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Set routes from file app/routes.js
setRoutes(app);

module.exports = app;