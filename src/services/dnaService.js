const {dnaRepository} = require('../repositories/dnaRepository')

class DnaService{
// constructor()
    async getAll(data){
        return await dnaRepository.getAll(data)
    }
    async create(dna){
        const dnaPlain= dna.join('')
        return await dnaRepository.create(dnaPlain)
    }
}

module.exports={dnaService: new DnaService()}