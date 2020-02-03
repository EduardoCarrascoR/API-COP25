import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, BeforeValidate, BeforeCreate, Default, HasMany, BelongsTo, BelongsToMany, ForeignKey, Scopes } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { UserRole } from './userRole.entity';

@Scopes(() => ({
    Users: {
        include:[{
            model: User,
            through: {attributes: []}
        }]
    }
}))

@Table({tableName: 'rol', timestamps: false})
export class Role extends Model<Role>{
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'idROL'
    })
    public id: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'NombreRol'
    })
    public nameRole: String;

    @BelongsToMany(() => User, () => UserRole)
    Users?: User[] 
    
} 