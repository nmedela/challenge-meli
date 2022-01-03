const express = require('express')
const appRouter = express.Router()
const mutantRoute=require('./mutantRoute')
const bodyParser = require('body-parser');

// appRouter.use(bodyParser.urlencoded({ extended: false }));
appRouter.use(bodyParser.json());
appRouter.use('/mutant',mutantRoute)

appRouter.get('/ping',(req,res)=>{
    res.json({message:'pong'})
})


module.exports=appRouter