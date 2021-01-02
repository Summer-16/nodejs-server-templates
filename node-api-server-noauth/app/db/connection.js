
'use strict';

const mysql = require('mysql2/promise');
const config = require('../config');
const dbConfig = config.db;

var pool;
const sqlOptions = {
    connectionLimit: 20, //important
    host: dbConfig.db_host,
    user: dbConfig.db_user,
    password: dbConfig.db_password,
    database: dbConfig.db_name,
    port: dbConfig.db_port,
    multipleStatements: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
    waitForConnections: true,
    // debug: true
}

try {
    pool = mysql.createPool(sqlOptions);
} catch (error) {
    console.error("Connection Pool Error : ", error);
}

module.exports = pool;