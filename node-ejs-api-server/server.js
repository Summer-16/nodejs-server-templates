
'use strict';

const config = require('./app/config/config.json');
const logger = require('./app/modules/logger')('Server');
const express = require("express");
const session = require('express-session');
const cors = require('cors');

const requestMiddleware = require('./app/middlewares/request');
const notFoundMiddleware = require('./app/middlewares/not_found');


const app = express();

app.set('view engine', 'ejs');

app.use(requestMiddleware.addRequestUUID);
app.use(express.static('public'));

app.use(session({
  secret: config.app.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

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
app.use(notFoundMiddleware.notFound);

// set port, listen for requests
const PORT = process.env.PORT || config.serverPort;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});


// ========== process error handling [ start ] ==========
process.on('uncaughtException', err => {
  logger.error("'uncaughtException' occurred! \n error:", err);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', reason.stack || reason);
});
// ========== process error handling [ end ] ==========
