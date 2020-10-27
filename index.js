require("dotenv").config();
const express = require("express");
const routes = require("./app/routes.js");

const app = express();



// Set routes from file app/routes.js
routes(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);