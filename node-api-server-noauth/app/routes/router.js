
'use strict';

module.exports = app => {

  // Middleware Import

  // Controllers Import
  const { home } = require("../controllers/home.js");

  //Public Router
  app.get("/", home);

  //Creator info route
  app.get('*', function (req, res) {
    res.send({
      success: true,
      message: "404 Not Found"
    })
  });
};