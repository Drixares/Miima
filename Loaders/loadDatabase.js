const mysql = require('mysql2');
require('dotenv').config();

module.exports = async () => {

  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_ROOT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  return db;
}