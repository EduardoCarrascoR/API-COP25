import { IDatabaseConfig } from "./interfaces/data-base.interface";

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3308,
        dialect: 'mysql',
        logging: true,
        force: true,
        timezone: '+02:00'
    },
    production: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3308,
        dialect: 'mysql',
        logging: true,
        force: true,
        timezone: '+02:00'
    },
    test: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3308,
        dialect: 'mysql',
        logging: true,
        force: true,
        timezone: '+02:00'
    }
}