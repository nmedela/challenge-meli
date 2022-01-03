const express = require('express')
const { route } = require('.')
const router = express.Router()
const { isMutant } = require('./../domain/mutant')

router.get('/', async (req, res, next) => {

    try {
        isMutant(req.body) ? res.status(200).json({ message: 'Es mutante' }) : res.status(403).json({ message: 'No s mutante' })
    } catch (error) {
        res.status(500).json(error)
    }
}
)

router.post('/', async (req, res, next) => {
    try {
        console.log('Entro a post',req.body.dna)
        isMutant(req.body.dna) ? res.status(200).json({ message: 'Es mutante' }) : res.status(403).json({ message: 'No s mutante' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router