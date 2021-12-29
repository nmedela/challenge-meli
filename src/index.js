const DNAEXAMPLE = ['AAATA', 'TTCAT', 'CCTAC', 'GGGAG', 'GGGAG']
const DNAEXAMPLE2 = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA","TCACTG"];
const NMIN = 4
const OCURRENCES=4
const stringValid = ['A', 'T', 'C', 'G']

function isMutant(dna) {
    try {
        var decomposedDNA = decomposeDNA(dna)
        var n = getN(decomposedDNA)
        checkStrings(decomposedDNA, stringValid)
        console.log('Matriz n=', n)
        console.log(dnaMatch(decomposedDNA, n, OCURRENCES))
    } catch (error) {
        console.error('Hubo un error -> ', error.message, ' \nhasta acá')
    }
}


// Convierte cada cadena de string en un array de strings 
function decomposeDNA(dna) {
    var decomposedDNA = []
    dna.forEach(c => {
        try {

            decomposedDNA.push(c.split(''))
        } catch (error) {
            throw Error('No se recibió caracteres válidos')
        }
    });
    return decomposedDNA
}

//Chequea si es NxN
// function checkNxN(dna){
//     getN(dna)
// }

//Obtiene el n de la matriz
function getN(dna) {
    var n = dna.length
    var rows = checkNumberRows(dna, NMIN)
    var columns = checkNumberColumn(dna, NMIN)
    if (!(rows == columns)) throw Error('No coinciden el numero de filas con el numero de columnas ')

    return n

}
//chequea numeros de filas según el tamaño del array comprobando que cumpla 
//con el N minimo que se pase por parametro
//devuelve numero de filas
function checkNumberRows(dna, n) {
    var rows = dna.length
    if (!(rows >= n)) throw Error('No cumple cantidad minima de filas')
    return rows
}

//Debe recibir un Array donde cada elemento es Array [[],[]...]
//Chequea que cada fila de la matriz contengan la misma cantidad de columnas
//Devuleve el numero de columnas
function checkNumberColumn(dna, n) {
    //Obtengo tamaño de columnas de la primera fila
    var columns = dna[0].length // [ []<-- (ese tamaño), ..[]  ]
    //Compruebo si no cumple requisito de n 
    if (!(columns >= n)) throw Error('Una o más filas no cumple cantidad minima de columnas')


    //compruebo que las columnas tengan la misma cantidad de filas comparando con las 

    //alternativa (compara el primero consigo mismo)
    // if( dna.some(r=> r.length != columns)) throw Error(No coinciden numeros de columnas)

    for (let nrow = 1; nrow < dna.length; nrow++) {
        const nColumns = dna[nrow].length; // numero de columnas de la fila
        if (!(nColumns == columns)) throw Error('Algunas filas no contienen la misma cantidad de columnas')
    }
    return columns
}

//chequea que los strings se encuentren en la lista de requisitos
function checkStrings(dna, strings) {
    dna.forEach(r => {
        r.forEach(c => {
            if (!strings.some(s => s === c)) throw Error('Hay caracteres invalidos')
        })
    })
}

function dnaMatch(dna, n, nOcurrences) {
    var matchs = 0

    //comienza secuencia chequando por filas
    
    matchs = searchOcurrences(dna, n, nOcurrences,matchs,compareRow)
    if(matchs > 1) return true
    console.log(matchs)
    
    //comienza secuencia chequando por columnas
    matchs = searchOcurrences(dna, n, nOcurrences,matchs,  compareColumn)
    console.log(matchs)
    if(matchs > 1) return true

    return false
}


function searchOcurrences(dna,n, nOcurrences,matchs, compareBy){
    // var matchs=0
    for (let r = 0; r < n; r++) {
        //Empiezo a comparar el primer elemento de la fila hasta que el index + 4(
            //porque es la cantidad de caracteres que tiene que haber iguales) sea menor o igual a N
            var c = 0
            // var row = dna[c];
        while (c + nOcurrences <= n){
                // var element = row[r];
                var ocurrences = 1
            //comparo con los 3 siguientes
            var i = c + 1 //puntero que arranque en el siguiente
                                        //   dna[r][c] == dna[r][i]
            while (i < c + nOcurrences &&  compareBy(dna,r,c,i)) {
                ocurrences++
                i++
            }
            if (ocurrences == nOcurrences) {
                console.log('Ocurrencias igual a ', ocurrences, ' en ', r ,' ', c)
                matchs++
                // c++  //descomentar si lo puedo superponer
            } 
            // else { //descomentar si lo puedo superponer
                c = i //salto al primero disinto
            // } // descomentar si lo puedo superponer
            if( matchs > 1 ){
                console.log('Detecto ', matchs, ' matchs')
                return matchs
            } 
        }
    }
    return matchs
}

const  compareRow =(dna, row, column, nextColumn) =>{
    return dna[row][column]==dna[row][nextColumn]
}
const compareColumn = (dna, row, column, nextRow) =>{
    return dna[column][row]==dna[nextRow][row]
}

isMutant(DNAEXAMPLE2)