const express = require('express')
const appRouter = express.Router()
const bodyParser = require('body-parser');
const mutantRoute=require('./mutantRoute')
const pingRoute=require('./pingRoute')
const {dnaService} = require('./../services/dnaService')

appRouter.use(bodyParser.json());

appRouter.use('/ping',pingRoute)
appRouter.use('/mutant',mutantRoute)

appRouter.get('/stats', async (req, res, next) => {
    try {
        await dnaService.getStats(async (err, data) => {
            if (err) res.status(500).json({ err })
            await res.status(200).json(data)
        }
        )
    } catch (error) {
        console.log('Hubo un error', error)
        res.status(500).json({ error })
    }
}
)


module.exports=appRouter