const con = require('./connection')

class DnaRepository{

    getStats =async (data)=>{
        //Agrupo los totales de mutantes y no mutantes
        await con.query("SELECT is_mutant, count(*) as total FROM dnas group by is_mutant", function (err, result, fields) {
            if (err) data(err,null) ;
            data(null, result)
            return;
          })
    }

    
    async create(dna){
        con.query(`insert into dnas (dna,is_mutant) values ("${dna}",${false}) `, function (err, result, fields) {
            if (err) throw err;
            console.log('Traigo esto de la base ',result);
            return result;
          });
    }
}

module.exports = { dnaRepository: new DnaRepository() }