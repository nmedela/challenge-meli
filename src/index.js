const express = require('express')
const PORT=4000
const app = express()

app.use('/',require('./routes/index.js'))
app.listen(PORT,()=>{
    console.log(`Server up & running on ${PORT}`)
})