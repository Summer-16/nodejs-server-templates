
'use strict';

var db = require('../db/db_bridge');
const table = "tbl_user_data"

/**
 *   User Model
 */
var homeModel = {

  /**
   * get all the user data form the table
   */
  home: function () {
    return new Promise(async (resolve, reject) => {
      try {

        // validation
        // if (!username) return reject("Username is not provided");

        let query = db.queryFormat(`SELECT * FROM ${table}`,);
        // console.log("query here==>", query)
        let queryRes = await db.query(query);
        if (!queryRes) {
          return reject("table dont Exist");
        }
        return resolve(queryRes);
      } catch (error) {
        console.error("error in homeModel->", error);
        reject(error)
      }
    });
  }

}

module.exports = homeModel;