const express = require('express')
const router = express.Router()
const {dnaService} = require('./../services/dnaService')


router.post('/', async (req, res, next) => {
    try {
        if(!req.body.dna) throw Error("No existe información")
        res.status(dnaService.checkMutant(req.body.dna) ? 200 : 403).send()
    } catch (error) {
        console.log(error.message)
        res.status(422).json(error.message)
    }
})

module.exports = router