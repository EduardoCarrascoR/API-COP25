import { Inject, Injectable } from '@nestjs/common';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @Inject('RoleRepository') private readonly roleRepository: typeof Role,
        @Inject('SequelizeInstance') private readonly sequelizeInstance
    ) {}
    
    public async findAll(): Promise<Array<Role>> {
      return await this.roleRepository.findAll<Role>()
    }


    public async findOne(options: Object): Promise<Role> {
        return await this.roleRepository.findOne<Role>(options)
      
    }
}