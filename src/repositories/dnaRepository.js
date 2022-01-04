const con = require('./connection')

class DnaRepository{

    getAll =async (data)=>{
        var resultado
        await con.query("SELECT * FROM dnas", function (err, result, fields) {
            if (err) data(err,null) ;
            console.log('Traigo esto de la base ',result);
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