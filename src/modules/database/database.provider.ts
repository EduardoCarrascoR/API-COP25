import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../../shared/index";
import { User } from "../users/user.entity";

export const databaseProvider = {
    provide:  'SequelizeInstance',
    useFactory: async () => {
        const sequelize = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            port: 3308,
            username: 'root',
            password: '',
            database: 'cop'
        })
        sequelize.addModels([User])
        await sequelize.sync().then(() => {
            console.log('database conected')
        })   
        
        return sequelize
    }

}