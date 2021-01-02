
'use strict';

const config = require('./app/config');
const express = require("express");
const cors = require('cors');

const app = express();

app.options('*', cors());
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json({
  limit: '50mb',
  extended: true
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));

require("./app/routes/router.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || config.serverPort;
app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}.`);
});

// ========== process error handling [ start ] ==========
process.on('uncaughtException', err => {
  console.error("'uncaughtException' occurred! \n error:", err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', reason.stack || reason);
});
// ========== process error handling [ end ] ==========
