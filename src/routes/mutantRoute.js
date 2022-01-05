const express = require('express')
const router = express.Router()
const { isMutant } = require('../domain/dna')
const {dnaService} = require('./../services/dnaService')


router.get('/stats', async (req, res, next) => {

    try {
        await dnaService.getStats(async (err, data) => {
            await res.status(200).json(data)
        }
        )
    } catch (error) {
        console.log('Hubo un error', error)
        res.status(500).json({error})
    }
}
)

router.post('/', async (req, res, next) => {
    try {
        if(!req.body.dna) throw Error("No existe información")
        res.status(dnaService.checkMutant(req.body.dna) ? 200 : 403).send()
    } catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
})

module.exports = router