require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require("express");
const routes = require("./app/routes.js");

const sequelize = new Sequelize(process.env.DB);
const app = express();

// Set routes from file app/routes.js
routes(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);