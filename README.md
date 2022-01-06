# challenge-meli
_El proyecto consiste en ofrecer un metodo llamado isMutant(dna) el cual se le pase como parametro un "ADN" que tiene un formato similar a este
dna= ["AAAT","TAAT","TAAT","AGAT"]
El metodo debe devolver true o false si detecta más de una secuencia de 4 letras iguales, de forma oblicua, horizontal o vertical.

En casos como, por ejemplo una fila, donde existan 5 o mas caracteres iguales se tomará la primera secuencia que encuentre de 4 
EJ:  ["AAAAAATG"] -> secuencia encontrada AAAA <-Match  luego el recorrido continuarpa chequeando al resto AATG <- No match
No se tomará en cuenta las siguientes coincidencias A "AAAA" ATG y AA "AAAA" TG estas no contarán como match

Debe ingresarse solo caracteres permitidos y en mayuscula, si no se retornará un error.
La matriz debe cumplir el nxn con un n mayor o igual a la cantidad de caracteres iguales que tener para satisfacer la condicion de match, en este caso n sera mayor o igual a 4

Para ello se deja a disposicion una API en el cual se puede acceder mediante 
POST -> /mutan/
{"dna":["AAAT","TAAT","TAAT","AGAT"]}

y determinará con un http 200-OK si es mutante o con un 403-Forbidden si no lo es

Adicionalmente existe un servicio extra /stats que devolverá un json con las verificaciones de ADN
{"count_mutant_dna":40,"count_human_dna":100, "ratio":0.4}
_

### Pre-requisitos 📋

_Existe un archivo de configuración (src/config/config.js) que se puede modificar según las necesidades_

```
const config = {
    environment: process.env.NODE_ENV || 'development',
    development: {
        db: {
            connection: {
                host: process.env.DB_HOST_DEV,
                user: process.env.DB_USER_DEV,
                password: process.env.DB_PASSWORD_DEV,
                database: process.env.DB_NAME_DEV,
            },
        },
        server: {
            connection: {
                port: process.env.SERVER_PORT_DEV
            }
        }

    },
    production: {
        db: {
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            },
        },
        server: {
            connection: {
                port: process.env.SERVER_PORT
            }
        }
    }

}
```
Se puede crear un archivo .env para pdoer configurar las variables de entorno para desarrollo
DB_HOST_DEV=
DB_USER_DEV=
DB_PASSWORD_DEV=
DB_NAME_DEV=
SERVER_PORT_DEV=

Así se podrá configurar el acceso a una base mySQL de manera local.
La base debe tener una tabla llamada dnas, con los campos id, dna, is_mutant

### Instalación 🔧

_Antes de iniciar, una opción para crear la tabla sería_


```
CREATE TABLE dnas (id bigint not null auto_increment, dna varchar(255) not null unique,is_mutant boolean not null, primary key (id) )
```

_Instalar dependencias ejecutando_

```
npm install
```
_Luego para ejecutar_

```
npm start
```


## Modo de uso

URL de la api
_https://challenge-meli-336819.ue.r.appspot.com_ o localhost:[puerto]/ si es en instancia local 

Se puede acceder desde una aplicacion que permita pruebas de api Ej: postman

Se crea una petición post https://challenge-meli-336819.ue.r.appspot.com/mutant/ con un json en el body que tenga esta caracteristica
```
{
"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```

En este caso se obtendrá un status 200-ok ya que es un adn mutante
En caso de enviar un adn humano, el status será 403-forbidden

Creando una petición get https://challenge-meli-336819.ue.r.appspot.com/stats se obtendrá la cantidad de adn's evaluados de mutantes y humanos, junto con el ratio
```
{
"count_mutant_dna": 2,
"count_human_dna": 9,
"ratio": 0.2222222222222222
}
```

## Autor ✒️

* **Nicolas Medela** - [nmedela](https://github.com/nmedela)

