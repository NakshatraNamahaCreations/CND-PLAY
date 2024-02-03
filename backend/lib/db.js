const mysql = require("mysql");
require('dotenv').config()
// console.log()
// console.log(process.env.DB_HOST)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + db.threadId);
});

module.exports = {db};