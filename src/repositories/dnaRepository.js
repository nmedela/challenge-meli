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


    async create(dna) {
        con.query(`select * from dnas where dna ="${dna}"`, function (err, result) {
            if (err) throw err;
            console.log('Traigo esto de la base ', result);
            if (result.length > 0){
                console.log('Ya existe en la base')
                return;
            } 
            con.query(`insert into dnas (dna,is_mutant) values ("${dna}",${false}) `, function (err, result, fields) {
                if (err) throw err;
                console.log('Se agrega dna ', result);
                return ;
            });
        })
    }
}

module.exports = { dnaRepository: new DnaRepository() }