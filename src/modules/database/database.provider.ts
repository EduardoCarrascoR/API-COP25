import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../../shared/index";
import { User } from "../users/user.entity";
import { Role } from "../role/role.entity";
import { UserRole } from "../role/userRole.entity";
import { Image } from "../Images/image.entity";
import { News } from "../news/news.entity";

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
        sequelize.addModels([User,Role,UserRole, Image, News])
        await sequelize.sync()
        .then(() => {
            console.log('database conected')
        })   
        .catch(err => {
            console.log('No se pudo conectar con la base de datos.')
        })
        
        return sequelize
    }

}