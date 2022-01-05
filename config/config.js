if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
    console.log('Is not production environment')
}

const config = {
    environment: process.env.NODE_ENV || 'development',
    development: {
        db: {
            connection: {
                host: process.env.DB_HOST_DEV,
                user: process.env.DB_USER_DEV,
                password: process.env.DB_PASSWORD_DEV,
                database: process.env.DB_NAME_DEV,
                // socketPath: '35.232.94.192'//`/cloudsql/challenge-meli-336819:us-central1:challenge-meli`
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
                // host: process.env.DB_HOST,
                user: 'root',//process.env.DB_USER,
                password: 12345678,//process.env.DB_PASSWORD,
                database: 'challenge_mutant',//process.env.DB_NAME,
                host: `/cloudsql/challenge-meli-336819:us-central1:challenge-meli`
            },
        },
        server: {
            connection: {
                port: 8080//process.env.SERVER_PORT
            }
        }
    }

}

module.exports = { config }