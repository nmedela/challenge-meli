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

module.exports = { config }