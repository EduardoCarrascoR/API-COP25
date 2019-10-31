import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, BeforeValidate, BeforeCreate, Default, Scopes, BelongsToMany, HasOne } from 'sequelize-typescript';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { Sequelize } from "sequelize";


@Table({tableName: 'noticia', timestamps: true, updatedAt: false})
export class News extends Model<News> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        field: 'idNOTICIA'
    })
    public id: number

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        field: 'Titulo'
    })
    public title: string

    @Column({
        type: DataType.TEXT,
        defaultValue: Sequelize.literal('NULL'),
        field: 'Descripcion'
    })
    public description: string

    @Column({
        type: DataType.STRING(250),
        defaultValue: Sequelize.literal('NULL'),
        field: 'Bajada'
    })
    public subTitle: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal('1'),
        field: 'Estado'
    })
    public state: string

    @CreatedAt 
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'FecCreacion'
    })
    public createdAt: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'idUSUARIO'
    })
    public userId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'idIMAGEN'
    })
    public imageId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'idEVENTO'
    })
    public eventId: number;

    @BeforeValidate
    public static validateData(news: News, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
        if (!news.title) throw new MessageCodeError('news:create:missingTitle');
        if (!news.description) throw new MessageCodeError('news:create:missingDescription');
        if (!news.subTitle) throw new MessageCodeError('news:create:missingSubTitle');
    }

}