
require('./repositories/connection')
const express = require('express')
const { config } = require('../config/config')
const PORT= config[config.environment].server.connection.port
const app = express()

app.use('/',require('./routes/index.js'))

//Se inicializa el server
app.listen(PORT,()=>{
    console.log(`Server up & running on ${PORT}`)
})
