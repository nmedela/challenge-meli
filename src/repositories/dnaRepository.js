const con = require('./connection')

class DnaRepository{

    getStats = async (data) => {
        //Agrupo los totales de mutantes y no mutantes
        await con.query("SELECT is_mutant, count(*) as total FROM dnas group by is_mutant", function (err, result, fields) {
            if (err) {
                data(err, null)
                return;
            };
            data(null, result)
            return;
        })
    }


    async create(dna,isMutant) {
        con.query(`select * from dnas where dna ="${dna}"`, function (err, result) {
            if (err){
                console.log("Hubo un error en la base ",err);
                return;
            } 
            console.log('Traigo esto de la base ', result);
            if (result.length > 0){
                console.log('Ya existe en la base')
                return;
            } 
            con.query(`insert into dnas (dna,is_mutant) values ("${dna}",${isMutant}) `, function (err, result, fields) {
                if (err){
                    console.log("Hubo un error en la base ",err);
                    return;
                } 
                console.log('Se agrega dna ', result);
                return ;
            });
        })
    }
}

module.exports = { dnaRepository: new DnaRepository() }