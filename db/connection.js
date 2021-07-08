const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
  {
    host : 'localhost',
    user : 'root',
    password : 'pravtoncoding',
    database : 'employees'
  }
)

module.exports = db;