
'use strict';

const homeModel = require("../models/home.js");

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
