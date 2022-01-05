const mysql = require('mysql')
const {config}= require('./../../config/config')
const environment=config.environment

//Se inicializa la conexión a base de datos
var con = mysql.createPool(
  config[environment].db.connection
  );

  module.exports= con