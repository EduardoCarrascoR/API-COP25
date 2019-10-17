import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, BeforeValidate, BeforeCreate, Default, HasMany, BelongsTo, BelongsToMany, ForeignKey, Scopes } from 'sequelize-typescript';
import { User } from "./user.entity";

/*@Table({tableName: 'rol'})
export class Role extends Model<Role>{
    //@ForeignKey(() => )
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
    
} */