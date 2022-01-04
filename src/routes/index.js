const express = require('express')
const appRouter = express.Router()
const mutantRoute=require('./mutantRoute')
const bodyParser = require('body-parser');

appRouter.use(bodyParser.json());
appRouter.get('/ping',(req,res)=>{
    res.json({message:'pong'})
})
appRouter.use('/mutant',mutantRoute)


module.exports=appRouter