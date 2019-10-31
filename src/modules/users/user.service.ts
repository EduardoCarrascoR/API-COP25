import { Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { CreateUserDto } from './dto/user.dto';
import { RoleDTO } from "../role/dto/role.dto";
import { CreateUserWithRutDto } from "./dto/userRut.dto";
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { UserRole } from "../role/userRole.entity";
import { UpdateStateUserDto } from './dto/user-state.dto';
import { UpdateUserDto } from './dto/user-update.dto';


@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject('SequelizeInstance') private readonly sequelizeInstance
    ) {}

    public async findAll(): Promise<Array<User>> {
        return await this.userRepository.findAll<User>()
    }

    public async findById(id: number): Promise<User> {
        return await this.userRepository.findByPk<User>(id)
    }

    public async findOne(options: Object): Promise<User | null> {
        return await this.userRepository.findOne<User>(options)
    }

    public async create(user: CreateUserWithRutDto): Promise<User> {
        let value = this.dgv(user.rut,user.rutDv)
        if (value===true) {
            const USER = await this.save(user)
            
            return await this.sequelizeInstance.transaction(
                async transaction => {
                    let u, roleId
                    await this.userRepository.create<User>(USER, {
                        transaction: transaction
                    
                    }).then(user => {u=user.id})
                    
                    /* await Role.findOne({where:{nameRole: user.role}, attributes: ['id']}).then(userD =>{ roleId = userD.id}) 
                    const RoleData = await this.saveRole(u, roleId)
                    console.log(RoleData)
                    await UserRole.create(RoleData, {
                        transaction: transaction,
                    }) */
                    
                }
            ).catch(err => {
                console.log(err)
            })
        } else {
            throw new MessageCodeError('user:create:missingRutValidation');
        } 
            
        
    }

    public async update(id: number, newValue: UpdateUserDto): Promise<User | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let user = await this.userRepository.findByPk<User>(id, {
                
                transaction
            });
            if (!user) throw new MessageCodeError('user:notFound');
            await user.update(newValue,{transaction})

        }).catch(err => {
            console.log(err)
        })
    }
    
    public async blockUser(id: number,state: UpdateStateUserDto): Promise<User> {
        
        return await this.sequelizeInstance.transaction(async transaction => {
            
            let user = await this.userRepository.findByPk<User>(id, {
                
                transaction
            });
            if (!user) throw new MessageCodeError('user:notFound');
            await user.update(state,{transaction})
        }).catch(err => {
            console.log(err)
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

    private save(user: CreateUserWithRutDto): CreateUserDto{
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

    private saveRole(RoleId, UserId): RoleDTO{
        let newValue = {
            roleId: RoleId,
            userId: UserId
        }
            
        return newValue as RoleDTO;
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