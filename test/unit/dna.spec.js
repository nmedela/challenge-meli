const { checkStrings, decomposeDNA, checkN,checkNumberRows,
    checkNumberColumn,dnaMatch,isMutant,searchOcurrencesRC,
    compareDiagonalUpToDownLeftToRight, compareDiagonalUpToDownRightToLeft } = require('./../../src/domain/dna')


    describe('Testing dna methods ', () => {


        describe('Test checkStrings', () => {
            test('Expect an error when an array with illegal characters is received ', () => {
                const arrayString=[["A","A","A","A"],["B","B","B","B"]]
                try{
                    checkStrings(arrayString)
                }catch(e){
                    expect(e.message).toBe("Hay caracteres invalidos");
                }
            });
            test('Expect an none when an array with legal characters is received ', () => {
                const arrayString=[["A","A","A","A"],["A","T","T","T"]]
                expect(checkStrings(arrayString)).toBe()
            });
        });
        describe('Test decomposeDna ', () => {
            test('Expect an error when an array with illegal element is received ', () => {
                const dna=[11,"TT"]
                try{
                    decomposeDNA(dna)
                }catch(e){
                    expect(e.message).toBe('No se recibió caracteres válidos')
                }
            });
            test('Expect a array with arrays element strings when received ["AA","TT"]', () => {
                const dna=["AA","TT"]
                expect(decomposeDNA(dna)).toEqual([["A","A"],["T","T"]])
            });
        
        });

        describe('Test checkN ', () => {
            test('Expect an error when an array with NxM is received ', () => {
                const dna=['AAAAT', 'TTTTT', 'CCTAC', 'GGGTG']
                try{
                    checkN(dna)
                }catch(e){
                    expect(e.message).toBe('No coinciden el numero de filas con el numero de columnas ')
                }
            });

            test('Expect none when NxN array is received and contain N min', () => {
                const dna=['AAAAT', 'TTTTT', 'CCTAC', 'GGGTG', 'GGGAT']
                expect(checkN(dna)).toBe()
            });
        
        });


        describe('Test checkNumberRows ', () => {
            test('Expect an error when an array with n< minimum rows is received ', () => {
                const dna=['AAA', 'TTT', 'CTA']
                try{
                    checkNumberRows(dna,4)
                }catch(e){
                    expect(e.message).toBe('No cumple cantidad minima de filas')
                }
            });

            test('Expect none when an array with n=minimum rows is received', () => {
                const dna=['AAAA', 'TTTT', 'CCTA', 'GGGT']
                expect(checkNumberRows(dna,4)).toBe(4)
            });
            test('Expect none when an array with n>=minimum rows is received', () => {
                const dna=['AAAAG', 'TTTTG', 'CCTAT', 'GGGTT','AAAAG']
                expect(checkNumberRows(dna,4)).toBe(5)
            });
        
        });

        describe('Test checkNumberColumn ', () => {
            test('Expect an error when an array with n< minimum column is received ', () => {
                const dna=['AAA', 'TTT', 'CTA']
                try{
                    checkNumberColumn(dna,4)
                }catch(e){
                    expect(e.message).toBe('Una o más filas no cumple cantidad minima de columnas')
                }
            });
            test('Expect an error when an array with n< minimum column is received ', () => {
                const dna=['AAAA', 'TTGT', 'CTAAS']
                try{
                    checkNumberColumn(dna,4)
                }catch(e){
                    expect(e.message).toBe('Algunas filas no contienen la misma cantidad de columnas')
                }
            });

            test('Expect none when an array with n=minimum columns is received', () => {
                const dna=['AAAA', 'TTTT', 'CCTA', 'GGGT']
                expect(checkNumberColumn(dna,4)).toBe(4)
            });
            test('Expect none when an array with n>=minimum columns is received', () => {
                const dna=['AAAAG', 'TTTTG', 'CCTAT', 'GGGTT','AAAAG']
                expect(checkNumberColumn(dna,4)).toBe(5)
            });
        
        
        });

        describe('Test isMutant', () => {
            test('Expect True when array with dna mutant is received ', () => {
                const dna=["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
                    expect(isMutant(dna)).toBeTruthy();
            });
            test('Expect False when array with dna mutant is received ', () => {
                const dna=["TTTA", "TTTA", "GGGT","AGAA"]
                expect(isMutant(dna)).toBeFalsy()
            });
        });


///TODO: Test searchOcurrencesRC,compareDiagonalUpToDownLeftToRight, compareDiagonalUpToDownRightToLeft,dnaMatch
    
    });