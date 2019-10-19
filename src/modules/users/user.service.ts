import { Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { CreateUserDto } from './dto/user.dto';
import { CreateUser2Dto } from "./dto/userRut.dto";
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

    public async create(user: CreateUser2Dto): Promise<User> {
        let value = this.dgv(user.rut,user.rutDv)
        if (value===true) {
            const USER = await this.save(user)

            return await this.sequelizeInstance.transaction(async transaction => {
                return await this.userRepository.create<User>(USER, {
                    transaction: transaction
                    
                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            throw new MessageCodeError('user:create:missingRutValidation');
        }
            
        
    }

    public async update(id: number, newValue: CreateUserDto): Promise<User | null> {
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
     * @param {CreateUserDto} user
     * @param {CreateUserDto} newValue
     * @return {User}
     * @private
     */

    private _assign(user: CreateUserDto, newValue: CreateUserDto): User {
        for (const key of Object.keys(user)) {
            if (user[key] !== newValue[key]) user[key] = newValue[key];
        }

        return user as User;
    }

    private save(user: CreateUser2Dto): CreateUserDto{
        let newValue = {
            name: user.name,
            rut: parseInt(user.rut.toString().concat(user.rutDv.toString())),
            firstSurname: user.firstSurname,
            secondSurname: user.secondSurname,
            password: user.password,
            email: user.email
        }
            
        return newValue as CreateUserDto;
    }

    private dgv(rut: number, dv: string){  
          var M=0,S=1;
          for(;rut;rut=Math.floor(rut/10)){
          S=(S+rut%10*(9-M++%6))%11;}
          //return S?S-1:'k';
          S=S-1
          switch (S) {
            case 11:
                if(dv===(S.toString())){return true}else{return false}
                break;
            case 0:
                let s='K'
                if(dv===(s)){return true}else{return false}
                break;    
            default:
                if(dv===(S.toString())){return true}else{return false}
                break;
          }
          
        
     }
}