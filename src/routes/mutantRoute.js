const express = require('express')
const { route } = require('.')
const router = express.Router()
const { isMutant } = require('../domain/dna')
const {dnaService} = require('./../services/dnaService')

router.get('/', async (req, res, next) => {
console.log('entre a mutant')
    try {
        await dnaService.getAll(async (err, data)=>{
        console.log('al volver traigo esto ',data)
        await res.status(200).send({message:data})
        })
        // isMutant(req.body) ? res.status(200).json({ message: 'Es mutante' }) : res.status(403).json({ message: 'No s mutante' })
    } catch (error) {
        console.log('acá hay error',error)
        res.status(500).json(error)
    }
}
)

router.post('/', async (req, res, next) => {
    try {
        console.log('Entro a post',req.body.dna)
        await dnaService.create(req.body.dna)
        isMutant(req.body.dna) ? res.status(200).json({ message: 'Es mutante' }) : res.status(403).json({ message: 'No s mutante' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router