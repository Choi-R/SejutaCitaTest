'use strict';
// Express Setup
const express = require('express');
const app = express();
const routes = require('./src/router')
app.use(express.json())
app.use('/', routes)

// Documentation
const swagger = require('swagger-ui-express')
const documentation = require('./src/documentation.json')
app.use('/documentation', swagger.serve, swagger.setup(documentation))

// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

module.exports = app;
