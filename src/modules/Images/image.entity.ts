import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, BeforeValidate, BeforeCreate, Default, Scopes, BelongsToMany, HasOne } from 'sequelize-typescript';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { Sequelize } from "sequelize";

@Table({tableName: 'imagen', timestamps: true, updatedAt: false})
export class Image extends Model<Image> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        field: 'idIMAGEN'
    })
    public id: number

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        field: 'Path'
    })
    public Url: string

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        field: 'Nombre'
    })
    public name: string

    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'FecCreacion'
    })
    public createdAt: number

    @BeforeValidate
    public static validateData(image: Image, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
    }
}