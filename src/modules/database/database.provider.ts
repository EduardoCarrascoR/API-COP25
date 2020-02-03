import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../../shared/index";
import { User } from "../users/user.entity";
import { Role } from "../role/role.entity";
import { UserRole } from "../role/userRole.entity";
import { Image } from "../Images/image.entity";
import { News } from "../news/news.entity";
import * as dotenv from 'dotenv';

dotenv.config()

export const databaseProvider = {
    provide:  'SequelizeInstance',
    useFactory: async () => {

        let config;
        switch (process.env.NODE_ENV) {
            case 'prod':
            case 'production':
                config = databaseConfig.production;
            case 'dev':
            case 'development':
                config = databaseConfig.development;
            default:
                config = databaseConfig.development;
        }

        const sequelize = new Sequelize(config);
        sequelize.addModels([User,Role,UserRole, Image, News])
        await sequelize.sync()
        .then(() => {
            console.log(`database conected.`)
        })   
        .catch(err => {
            console.log('No se pudo conectar con la base de datos.')
            console.log(err)
        })
        
        return sequelize
    }

}