import * as crypto from 'crypto';
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, BeforeValidate, BeforeCreate, Default } from 'sequelize-typescript';
import { MessageCodeError } from '../../shared/errors/message-code-error';


@Table({tableName: 'usuario', timestamps: true})
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        field: 'idUSUARIO'
    })
    public id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
        field: 'NumIden'
    })
    public rut: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'Nombres'
    })
    public name: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        field: 'ApellidoPrin'
    })
    public firstSurname: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: true,
        field: 'ApellidoSec'
    })
    public secondSurname: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: true,
        field: 'Password'
    })
    public password: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        field: 'Email',
        validate: {
            isEmail: true,
            isUnique: async (value: string, next: Function): Promise<any> => {
                const isExist = await User.findOne({ where: { email: value } });
                if (isExist) {
                    const error = new MessageCodeError('user:create:emailAlreadyExist');
                    next(error);
                }
                next();
            }
        }
        
    })
    public email: string;
        
    @Column({
        type: DataType.STRING(100),
        allowNull: true,
        field: 'Token'
    })
    token: string
    
    @CreatedAt 
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: 'FechaCreacion'
    })
    public createdAt: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: 'FechaModificacion'
    })
    public updatedAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: 'FechaUltConex'
    })
    public deletedAt: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'Estado',
         
    })
    public state: number;

    @BeforeValidate
    public static validateData(user: User, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
        if (!user.rut) throw new MessageCodeError('user:create:missingRut');
        if (!user.name) throw new MessageCodeError('user:create:missingName');
        if (!user.firstSurname) throw new MessageCodeError('user:create:missingFirstSurname');      // hacer mensaje de error y eliminar el last name
        if (!user.secondSurname) throw new MessageCodeError('user:create:missingSecondSurname');    // hacer mensaje de error y eliminar el last name
        if (!user.email) throw new MessageCodeError('user:create:missingEmail');
        if (!user.password) throw new MessageCodeError('user:create:missingPassword');
    }

    @BeforeCreate
    public static async hashPassword(user: User, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');

        user.password = crypto.createHmac('sha256', user.password).digest('hex');
    }
}