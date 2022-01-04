const mysql = require('mysql')

var con = mysql.createConnection({
    host: "35.232.94.192",
    // port:3306,
    user: "root",
    password: "12345678",
    database: "challenge_mutant"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
  });

  module.exports= con