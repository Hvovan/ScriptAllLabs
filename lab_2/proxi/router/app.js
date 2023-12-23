require('dotenv').config();

const express = require('express');
const app = express();

let config = require('../service/config.js');

app.get("/", (req, res) => {
     console.log(`Redirecting to ${config.get('url')}`)
     res.redirect(config.get('url'));
});

module.exports = app;