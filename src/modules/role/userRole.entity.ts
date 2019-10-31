import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, BeforeValidate, BeforeCreate, Default, HasMany, BelongsTo, BelongsToMany, ForeignKey, Scopes } from 'sequelize-typescript';
import { Role } from './role.entity';
import { User } from '../users/user.entity';

@Table({
    tableName: 'usuariorol',
    
    createdAt:false,
    updatedAt: false
})
export class UserRole extends Model<UserRole>{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        field: 'idROL'
    })
    public roleId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        field: 'idUSUARIO'
    })
    public userId: String;
    
} 