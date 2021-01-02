
'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const jwtSecretKey = config.jwt.key;

/**
 * check token middleware
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const checkToken = (req, res, next) => {
    const token = req.session.token || req.headers['x-access-token'] ||
        req.headers['authorization']; // Express headers are auto converted to lowercase

    let jwtToken = token;
    const isAdminRoute = req.route.path === "/adminlogin"
        || req.headers.referer.indexOf("/adminlogin") != -1;
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            jwtToken = token.slice(7, token.length);
        }

        jwt.verify(jwtToken, jwtSecretKey, (err, decoded) => {
            if (err) {
                return res.render('Login', {
                    "steamLogin": (steamAPIKey ? true : false),
                    "adminRoute": isAdminRoute,
                    "error": "Unauthorized Access, If you are an Admin try logging in"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.render('Login',
            {
                "steamLogin": (steamAPIKey ? true : false),
                "adminRoute": isAdminRoute,
                "error": "Unauthorized Access, If you are an Admin try logging in"
            });
    }
};


module.exports = {
    checkToken
};