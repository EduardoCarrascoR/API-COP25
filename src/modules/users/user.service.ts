import { Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { CreateProductDto } from './dto/user.dto';
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject('SequelizeInstance') private readonly sequelizeInstance
    ) {}

    public async findAll(): Promise<Array<User>> {
        return await this.userRepository.findAll<User>()
    }

    public async findById(id: number): Promise<User | null> {
        return await this.userRepository.findByPk<User>(id)
    }

    public async findOne(options: Object): Promise<User | null> {
        return await this.userRepository.findOne<User>(options)
    }

    public async create(user: CreateProductDto): Promise<User> {
        console.log(user)
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.userRepository.create<User>(user, {
                transaction: transaction
                
            })
        })
    }

    public async update(id: number, newValue: CreateProductDto): Promise<User | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let user = await this.userRepository.findByPk<User>(id, {
                transaction
            });
            if (!user) throw new MessageCodeError('user:notFound');

            user = this._assign(user, newValue);
            return await user.save({
                //returning: true,
                transaction
            });
        });
    }
    
    public async delete(id: number): Promise<void> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.userRepository.destroy({
                where: {id},
                transaction
            })
        })
    }

    /**
     * @description: Assign new value in the user found in the database
     * 
     * @param {CreateProductDto} user
     * @param {CreateProductDto} newValue
     * @return {User}
     * @private
     */

    private _assign(user: CreateProductDto, newValue: CreateProductDto): User {
        for (const key of Object.keys(user)) {
            if (user[key] !== newValue[key]) user[key] = newValue[key];
        }

        return user as User;
    }
}