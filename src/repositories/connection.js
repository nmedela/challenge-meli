const mysql = require('mysql')
const {config}= require('./../../config/config')
const environment=config.environment

var con = mysql.createPool(

  config[environment].db.connection
  );

 
  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("DB Connected!");
  // });

  module.exports= con