const NMIN = 4
const NOCURRENCES = 4
const STRINGVALID = ['A', 'T', 'C', 'G']
const isMutant=(dna)=> {
        var decomposedDNA = decomposeDNA(dna)
        checkN(decomposedDNA)
        checkStrings(decomposedDNA)
        return dnaMatch(decomposedDNA)
}
// Convierte cada string en un array de String ej: recibe ["AAAA" ,..,"TTTT"] devuelve [["A","A","A","A"],...,["T","T","T","T"]]
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

//Devuelve error si no es nxn y chequea que cumpla el n minimo
function checkN(dna) {
    var n = dna.length
    var rows = checkNumberRows(dna, NMIN)
    var columns = checkNumberColumn(dna, NMIN)
    if (!(rows == columns)) throw Error('No coinciden el numero de filas con el numero de columnas ')
}
//devuelve numero de filas y chequea si cumple con el n minimo
function checkNumberRows(dna, n) {
    var rows = dna.length
    if (!(rows >= n)) throw Error('No cumple cantidad minima de filas')
    return rows
}
//Debe recibir [[String,..],[]...]
//Chequea que cada fila de la matriz contengan la misma cantidad de columnas
//Devuleve el numero de columnas
function checkNumberColumn(dna, n) {
    var columns = dna[0].length //Obtengo tamaño de columnas de la primera fila [ []<-- (ese tamaño), ..[]  ]
    if (!(columns >= n)) throw Error('Una o más filas no cumple cantidad minima de columnas')//Compruebo si no cumple requisito de n 
    for (let nrow = 1; nrow < dna.length; nrow++) {
        if (!(dna[nrow].length == columns)) throw Error('Algunas filas no contienen la misma cantidad de columnas') // Compara numero de columnas de la primera fila con el resto
    }
    return columns
}

///chequea que los strings se encuentren en la lista de requisitos
function checkStrings(dna) {
    dna.forEach(r => {
        r.forEach(c => {
            if (!STRINGVALID.some(s => s === c)) throw Error('Hay caracteres invalidos')
        })
    })
}

//Se le debe pasar el dna descompuesto, el N de la matriz y la condicion de ocurrencias de un caracter para
function dnaMatch(dna) {
    var matchs = 0
    matchs = searchOcurrencesRC(dna, matchs, compareRow) //comienza secuencia chequando por filas
    console.log('hay ', matchs)
    if (matchs > 1) return true
    matchs = searchOcurrencesRC(dna,matchs, compareColumn) // comienza secuencia chequando por columnas
    if (matchs > 1) return true
    matchs = compareDiagonalUpToDownLeftToRight(dna,matchs)
    if (matchs > 1) return true
    matchs = compareDiagonalUpToDownRightToLeft(dna,matchs)
    if (matchs > 1) return true
    return false
}
// Busqueda por fila o por columna- Recibe dna descompuesto, los matchs que hay hasta el momento y callback de como debe compararse los elementos
function searchOcurrencesRC(dna, matchs, compareBy) {
    var n=dna.length
    for (let r = 0; r < n; r++) { //se realizan n cantidad de iteraciones, comienza de izquierda a derecha y de arriba a abajo
        var c = 0 // puntero de caracter que va a ser comparado con los siguientes
        while (c + NOCURRENCES <= n) { //chequeo que la posicion del caracter a comparar mas la cantidad de ocurrencias totales que debe haber NO supere a n
            var ocurrences = 1 //tomo como primera ocurrencia al caracter donde se encuentra posicionado c
            var i = c + 1 //puntero que arranque en el siguiente
            //   dna[r][c] == dna[r][i]
            //Compara con los siguientes caracteres mientras que las posiciones siguientes no excedan el total de ocurrencias que debe haber y el caracter sea igual
            //
            while (i < c + NOCURRENCES && compareBy(dna, r, c, i)) { 
                ocurrences++ //si el caracter siguiente es igual, agrega una ocurrencia
                i++ //paso a la siguiente posicion
            }
            if (ocurrences == NOCURRENCES) { //chequeo si las ocurrencias encontradas son igual al total que se pide
                matchs++ // Agrego que encontré una secuencia del total pedido de caracteres juntos
            }
            if (matchs > 1) { //si la cantidad de secuencias encontradas es mayor a 1, salgo del ciclo
                return matchs
            }
            c = i //Si no supera a 1 salto a la primera posicion siguiente que se encontró un caracter distinto
        }
    }

    return matchs 
}

//Se compara los caracters de una misma Fila pasando la posicion de la fila, con la columna que contiene el caracter y alguna posicion de las columnas subsiguiente que se desea comparar
const compareRow = (dna, row, column, nextColumn) => {
    return dna[row][column] == dna[row][nextColumn]
}

//Se compara los caracteres de una misma Columna pasando la posicion de la columna, con la fila que contiene el caracter y alguna posicion de las filas subsiguiente
const compareColumn = (dna, column, row, nextRow) => {
    return dna[row][column] == dna[nextRow][column]
}

//buscar por diagonal de arriba a abajo e izquierda a derecha -> \\\
function compareDiagonalUpToDownLeftToRight(dna,matchs) {
    var n=dna.length
    //diagonal superior
    //-> * * * * * 
    //     * * * * 
    //       * * * 
    //         * * 
    //           * 
    //Comienza en columna 0 y  a recorrer hasta la diagonal de la columna n - total de ocurrencias requerida (4 caracteres)
    for (let r = 0; r <=n-NOCURRENCES; r++) { 
        var j=0 //Pivot de fila comienza el recorrido de las diagonales siempre en la fila 0
        var f= r //Pivot columna - ubico la columna del caracter de referencia para iniciar la recorrida de la diagonal
        while(f+NOCURRENCES<=n){ //La posicion del pivot de caracter de referencia mas el total de ocurrencias requeridas no debe superar n
            var ocurrences = 1 // Cuento el caracter a evaluar como una ocurrencia
            var i = f + 1  // pivot de columna siguiente
            var h=j+1   //pivot de fila siguiente

            //Seguirá comparando con el elemento subsiguiente de la diagonal,
            // mientras que la posicion del pivot subsiguiente sea menor a la posicion de caracter de referencia mas el total de ocurrencias requeridas
            while (i < f + NOCURRENCES &&  dna[j][f] == dna[h][i] ) {
                ocurrences++ //encuentra ocurrencia, entonces suma
                //sigo en la misma diagonal
                i++ //muevo el pivot a la subsiguiente columna
                h++ //muevo el pivot a la subsiguiente fila
            }
            if (ocurrences == NOCURRENCES) { //si las ocurrencias encontradas es igual al total requerido aumenta la cantidad de secuencias encontradas
                matchs++
            }
            if (matchs > 1) {//si las secuencias encontradas es mayor a uno retorno
                return matchs
            }
            f=i;// cambio a la posicion de la columna del primer caracter distinto en la misma diagonal
            j=h //cambio a la posicion de la fila del primer caracter distinto en la misma diagonal
        }
    }

    //Continúa diagonal inferior
    //
    // -> *
    // -> * * 
    //    * * *
    //    * * * *
    //la cantidad de iteraciones posibles para la diagonal inferior será de n - la cantidad total de ocurrencias requeridas
    for (let r = 0; r <n-NOCURRENCES; r++) {
        var j=r+1 //pivot de fila comienza en la fila 1, luego se ubica en las filas siguiente para comenzar las diagnoales inferiores
        var f=0 //pivot columna empieza siempre en la 0

        //Se realizará comparaciones mientras la suma de la posicion de la columna del caracter de referencia y el total de ocurrencias pedidas
        // no supere a n menos la posicion de la fila inicial de la diagonal 
        while(f+NOCURRENCES <= n-r-1){  
            var ocurrences = 1 //agrego una ocurrencia mientras me paro en el caracter de referencia
            var i = f + 1 // pivot de columnas subsigiente dsobre la misma diagonal
            var h=j+1 // pivot de filas subsiguientes sobre la misma diagonal
            
            //continuará comparando mientras la posicion del pivot de las columnas subsiguiente sea menor a el total de ocurrencias requeridas
            while (i <  NOCURRENCES &&  dna[j][f] == dna[h][i] ) {
                ocurrences++ //es igual al caracter de referencia, sumo una ocurrencia
                i++ //aumento pivot a la columna siguiente
                h++ //aumento pivot a la fila siguiente
            }

            if (ocurrences == NOCURRENCES) { //si las ocurrencias encontradas es igual al total requerido, aumento la cantidad de secuencias encontradas
                matchs++
            }
            if (matchs > 1) { //retorno la cantidad de secuencias encontradas si es mayor a 1
                return matchs
            }

            f=i; // cambio a la posicion de la columna del primer caracter distinto en la misma diagonal
            j=h // cambio a la posicion de la dila del primer caracter distinto en la misma diagonal

        }
        
    }
    return matchs
    }

//buscar por diagonal de arriba a abajo y derecha a izquierda -> ///

function compareDiagonalUpToDownRightToLeft(dna,matchs) {
    var n=dna.length
        //diagonal superior
        // * * * * * <-
        // * * * *
        // * * *
        // * *
        // *
    //la cantidad maxima de ciclos  a recorrer no va a superar la cantidad de N - total de ocurrencias requeridas(4)
        for (let r = 0; r <=n-NOCURRENCES; r++) {
            var j=0 //pivot de  fila comienza siempre en la fila 0 al iniciar una diagonal
            var f=n-r-1 // pivot de columna comienza n-1 y va disminuyendo
            // la posicion del pivot de columna del caracter de referencia NO tiene que ser menor al total de ocurrencias requeridas -1
            while(f>=NOCURRENCES-1){
                var ocurrences = 1 // agrego una ocurrencia por el primer caracter
                var i = f - 1 // pivot de columna que va disminuyendo hacia la subsiguiente a evaluar (hacia atras)
                var h=j+1  // pivot de fila siguiente
                //Se comparará con el subsiguiente caracter mientras la posicion de dicho pivot sea mayor a a del caracter de referencia menos el total de ocurrencias requeridas
                while (i > f-NOCURRENCES &&  dna[j][f] == dna[h][i] ) {
                    ocurrences++ //si compara y son iguales, agrega una ocurrencia
                    i-- //disminuye el pivot de columna para que se pueda evaluar la subsiguiente en la misma diagonal
                    h++ //incremento el pivot de fila de la misma diagonal
                }
                if (ocurrences == NOCURRENCES) { //si es igual a lo requerido aumento la cantidad de secuencias encontradas
                    matchs++
                }
                if (matchs > 1) { //si las secuencias encontradas es mayor a 1 retorno la cantidad
                    return matchs
                }

                f=i; //cambio la posicion de columna de caracter de referencia al primer subsiguiente distinto encontrado
                j=h // cambio la posicion de fila de caracter de referencia para continuar en la misma diagonal
            }
        }
    
        //diagonal inferior
        // 
        //         * <-
        //       * *
        //     * * *
        //   * * * *

        //la cantidad de ciclos utiles serán a n menos la cantidad de ocurrencia requeridas
        for (let r = 0; r <n-NOCURRENCES; r++) {
            var j=r+1 //pivot de fila que comienza en la fila 1 y luego va aumentando
            var f=n-1 //pivot de columna que comienza siempre en n - 1
            // se podrá seguir evaluando la diagonal mientras la posicion de la fila del caracter de referencia sea menor o igual a N - total ocurrencias requeridas
            // while(f-NOCURRENCES+1>0){    
            while(j<=n-NOCURRENCES){    
                var ocurrences = 1  //Agrego una ocurrencia por ser el caracter de referencia
                var i = f - 1 // pivot de columna subsiguiente, que disminuye
                var h=j+1 // pivot de fila que va aumentando sobre la misma diagonal
                //comparará el subsiguiente si la posición del pivot de columna siguiente es mayor a la posicion de la columna de caracter de referencia - el total de ocurrencias requeridas 
                while ( i> f-NOCURRENCES &&  dna[j][f] == dna[h][i] ) {
                    ocurrences++ //si hay concidencia aumenta la cantidad
                    i-- //disminuye la columna pivot subsiguiente para evaluar sobre la misma diagonal con el caracter de referencia
                    h++ //aumenta la fila para comparar con el caracter subsiguiente sobre la misma diagonal
                }
                if (ocurrences == NOCURRENCES) { //si las ocurrencias coinciden con lo requerido, aumenta el valor de las secuencias encontradas
                    matchs++
                }
                if (matchs > 1) { //si las secuencias encontradas es mayor a uno retorno el valor
                    return matchs
                }
                f=i; //cambio la posicion de la columna de caracter de referencia al primero distinto encontrado, sobre la misma diagonal 
                j=h // cambio la posicion de la fila de caracter de referencia al primero distinto encontrado sobre la misma diagonal
            }
            
        }
        return matchs
    }

    // 2 * (n - nOcurrences) + 1 <- Cantidad de iteraciones

    module.exports={
        isMutant,
        checkN,
        checkStrings,
        decomposeDNA,
        dnaMatch,
        checkNumberRows,
        checkNumberColumn,
        searchOcurrencesRC,
        compareDiagonalUpToDownLeftToRight,
        compareDiagonalUpToDownRightToLeft
    }