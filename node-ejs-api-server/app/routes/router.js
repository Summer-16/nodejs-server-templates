
'use strict';

module.exports = app => {

  // Middleware Import
  const authMiddleware = require('../middlewares/auth');

  // Controllers Import
  const { dashboard, home } = require("../controllers/homeController.js");

  //Public Router
  app.get("/", dashboard);


};