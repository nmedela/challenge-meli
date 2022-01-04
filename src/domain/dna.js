const DNAEXAMPLE = ['AAAAT', 'TTTTT', 'CCTAC', 'GGGTG', 'GGGAT']
const DNAEXAMPLE2 = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
const DNAEXAMPLE3 = ["ATGTGAG",
                     "AAGCGGT",
                     "AACTGTC", 
                     "ACATGGG", 
                     "CCTATGA", 
                     "TTACGTT",
                     "TCAGTGT"];
const DNAEXAMPLE4 = ["AAAAAAA",
                     "AAAAAAA",
                     "AAAAAAA", 
                     "AAAAAAA", 
                     "AAAAAAA", 
                     "AAAAAAA",
                     "AAAAAAA"];
const NMIN = 4
const OCURRENCES = 4
const stringValid = ['A', 'T', 'C', 'G']

 const isMutant=(dna)=> {
    try {
        var decomposedDNA = decomposeDNA(dna)
        var n = getN(decomposedDNA)
        checkStrings(decomposedDNA, stringValid)
        console.log('Matriz n=', n)
        return dnaMatch(decomposedDNA, n, OCURRENCES)
    } catch (error) {
        console.error('Hubo un error -> ', error, ' \nhasta acá')
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
    matchs = searchOcurrencesRC(dna, n, nOcurrences, matchs, compareRow)
    if (matchs > 1) return true
    console.log(matchs)
    // //comienza secuencia chequando por columnas
    matchs = searchOcurrencesRC(dna, n, nOcurrences, matchs, compareColumn)
    console.log(matchs)
    if (matchs > 1) return true
    matchs = compareDiagonalUpToDown(dna, n, nOcurrences, matchs, false)
    matchs = compareDiagonal(dna, n, nOcurrences, matchs, true)
    console.log(matchs)
    if (matchs > 1) return true
    return false
}
// Busqueda por fila y por columna
function searchOcurrencesRC(dna, n, nOcurrences, matchs, compareBy) {
    for (let r = 0; r < n; r++) {
        var c = 0
        while (c + nOcurrences <= n) {
            var ocurrences = 1
            var i = c + 1 //puntero que arranque en el siguiente
            //   dna[r][c] == dna[r][i]
            while (i < c + nOcurrences && compareBy(dna, r, c, i)) {
                ocurrences++
                i++
            }
            if (ocurrences == nOcurrences) {
                console.log('Ocurrencias igual a ', ocurrences, ' en ', r, ' ', c)
                matchs++
            }
            c = i //salto al primero disinto
            if (matchs > 1) {
                console.log('Detecto ', matchs, ' matchs')
                return matchs
            }
        }
    }
    return matchs
}

const compareRow = (dna, row, column, nextColumn) => {
    return dna[row][column] == dna[row][nextColumn]
}
const compareColumn = (dna, column, row, nextRow) => {
    return dna[row][column] == dna[nextRow][column]
}

//buscar por diagonal
function compareDiagonalUpToDown(dna, n, nOcurrences, matchs, leftToRight) {
    // var limit=n-nOcurrences  
    //diagonal superior
    for (let r = 0; r <=n-nOcurrences; r++) {
        // var c=r
        var j=0
            var f= r
            while(f+nOcurrences<=n){
            var ocurrences = 1
            var i = f + 1 
             var h=j+1   
            while (i < f + nOcurrences &&  dna[j][f] == dna[h][i] ) {
                ocurrences++
                i++
                h++
            }
            if (ocurrences == nOcurrences) {
                matchs++
            }
            f=i;
            j=h
        }
    }
    console.log('hay ', matchs)

    //diagonal inferior
    for (let r = 0; r <n-nOcurrences; r++) {
        var j=r+1
        var f=0
        while(f+nOcurrences <= n-r-1){    
            var ocurrences = 1
            var i = f + 1 
            var h=j+1 
            while (i <  nOcurrences &&  dna[j][f] == dna[h][i] ) {
                ocurrences++
                i++
                h++
            }
            if (ocurrences == nOcurrences) {
                console.log('Ocurrencias igual a ', ocurrences, ' en ', j, ' ', f)
                matchs++
            }
            if (matchs > 1) {
                console.log('Detecto ', matchs, ' matchs')
                return matchs
            }
            f=i;
            j=h

        }
        
    }
    console.log('hay ', matchs)
    return matchs
    }
function compareDiagonal(dna, n, nOcurrences, matchs, leftToRight) {
        // var limit=n-nOcurrences  
        //diagonal superior
        for (let r = 0; r <=n-nOcurrences; r++) {
            // var c=r
            var j=0
                var f=n-r-1
                while(f-nOcurrences+1>=0){
                var ocurrences = 1
                var i = f - 1 
                 var h=j+1  
                 console.log('recorro ', j,' ', f,' ',dna[j][f] ,' con el siguiente ', h,' ',i,' ',dna[h][i])
                while (i > f-nOcurrences &&  dna[j][f] == dna[h][i] ) {
                    ocurrences++
                    console.log('entra ',ocurrences)
                    i--
                    h++
                }
                if (ocurrences == nOcurrences) {
                    console.log('Hay match')
                    matchs++
                }
                if (matchs > 1) {
                    console.log('Detecto ', matchs, ' matchs')
                    return matchs
                }
                f=i;
                j=h
            }
        }
        console.log('hay ', matchs)
    
        //diagonal inferior
        for (let r = 0; r <n-nOcurrences; r++) {
            var j=r+1
            var f=n-1
            while(f-nOcurrences+1>0){    
                var ocurrences = 1
                var i = f - 1 
                var h=j+1 
                console.log('recorro ', j,' ', f,' ',dna[j][f] ,' con el siguiente ', h,' ',i,' ',dna[h][i])
                while ( i> f-nOcurrences &&  dna[j][f] == dna[h][i] ) {
                    ocurrences++
                    console.log('entra ',ocurrences)
                    i--
                    h++
                }
                if (ocurrences == nOcurrences) {
                    console.log('Ocurrencias igual a ', ocurrences, ' en ', j, ' ', f)
                    matchs++
                }
                if (matchs > 1) {
                    console.log('Detecto ', matchs, ' matchs')
                    return matchs
                }
                f=i;
                j=h
            }
            
        }
        console.log('hay ', matchs)
        return matchs
    }
    
        
    // isMutant(DNAEXAMPLE)

    //  00 01 02 03 04          
    //     11 12 13 14
    //        22 23 24
    //           33 34
    //              44
    //  10 
    //  20 21 
    //  30 31 32 
    //  40 41 42 43 
     
    

    //  00 01 02 03 04          
    //  10 11 12 13 
    //  20 21 22 
    //  30 31 
    //  40 
    //               14
    //            23 24
    //         32 33 34
    //      41 42 43 44
    
    // 04 13 22 31 40
    // 03 12 21 30
    // 02 11 20
    // 01 10
    // 00
    // 14 23 32 41
    // 24 33 42 
    // 34 43 
    // 44

    // 2 * (n - nOcurrences) + 1 <- Cantidad de iteraciones

    // 4 - 4 0-> 1
    // 5 - 4  1-> 3
    // 6 - 4 2-> 5
    // 7 - 4  3-> 7
    // 8 4 4->9
    // 9->11
    // 10->13
    module.exports={isMutant}