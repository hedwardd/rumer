const express = require('express');
const cors = require('cors');
const session = require('express-session');
const auth = require('./auth');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

auth(app);
routes(app);

module.exports = app;
