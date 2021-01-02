

'use strict';
const logger = require('../modules/logger')('VIP Controller');

const homeModel = require("../models/home.js");

//-----------------------------------------------------------------------------------------------------
// 

exports.dashboard = async (req, res) => {
  try {
    let result = dashboardFunc(req.body)
    res.render('home', { "data": result });
  } catch (error) {
    logger.error("error in dashboard->", error);
    res.render('home', { "data": null });
  }
}

const dashboardFunc = (reqBody, token) => {
  return new Promise(async (resolve, reject) => {
    try {

      resolve({ "data": "data" })
    } catch (error) {
      logger.error("error in dashboardFunc->", error);
      reject(error)
    }
  });
}

exports.dashboardFunc = dashboardFunc;
//-----------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------
// 

exports.home = async (req, res) => {
  try {
    let result = await homeFunc(req.body);
    res.send({
      success: true,
      message: result
    })
  } catch (error) {
    console.error("error in home->", error);
    res.send({
      success: false,
      message: error
    })
  }
}

const homeFunc = (reqBody, token) => {
  return new Promise(async (resolve, reject) => {
    try {

      let data = await homeModel.home()

      resolve({ "text": "Hi this is Home of API", data: data })
    } catch (error) {
      console.error("error in homeFunc->", error);
      reject(error)
    }
  });
}

exports.homeFunc = homeFunc;
//-----------------------------------------------------------------------------------------------------
