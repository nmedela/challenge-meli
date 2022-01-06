const {dnaRepository} = require('../repositories/dnaRepository')
const {isMutant}=require('./../domain/dna')

class DnaService {
// constructor()
    async getStats(data){

        await dnaRepository.getStats((err,result)=>{
            if(err) throw err
            var count_mutant_dna
            var count_human_dna
            result.forEach(e => {
                e.is_mutant? count_mutant_dna=e.total:count_human_dna=e.total
            });
            data(null, {count_mutant_dna,count_human_dna, ratio: count_mutant_dna/count_human_dna})
        })
         
    
    }
    checkMutant(dna){
        var dnaIsMutant= isMutant(dna)
        const dnaPlain= dna.join('')
         dnaRepository.create(dnaPlain)
        return dnaIsMutant
    }
}

module.exports={dnaService: new DnaService()}