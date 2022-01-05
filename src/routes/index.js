const express = require('express')
const appRouter = express.Router()
const bodyParser = require('body-parser');
const mutantRoute=require('./mutantRoute')
const pingRoute=require('./pingRoute')

appRouter.use(bodyParser.json());

appRouter.use('/ping',pingRoute)
appRouter.use('/mutant',mutantRoute)


module.exports=appRouter