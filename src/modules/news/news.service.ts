import { Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { CreateNewsDto } from "./dto/create-news.dto";
import { NewsDto } from "./dto/news.dto";
import { News } from './news.entity';
import { Image } from "../Images/image.entity";

@Injectable()
export class NewService {
    constructor(
        @Inject('NewsRepository') private readonly newsRepository: typeof News,
        @Inject('ImageRepository') private readonly imageRepository: typeof Image,
        @Inject('SequelizeInstance') private readonly sequelizeInstance
    ){}

    public async findAll(): Promise<Array<News>> {
        return await this.newsRepository.findAll<News>()
    }

    public async findById(id: number): Promise<News> {
        return await this.newsRepository.findByPk<News>(id)
    }

    public async findOne(options: Object): Promise<News | null> {
        return await this.newsRepository.findOne<News>(options)
    }

    public async create(news: NewsDto): Promise<News> {
        return await this.sequelizeInstance.transaction(
            async newTransaction => {
                let imageId
                await Image.findOne({where:{Url: news.URLImage}, attributes: ['id']}).then(imageID =>{ imageId = imageID.id}) 
                const NewsData = await this.saveNews(news, imageId)
                await this.newsRepository.create<News>(NewsData, {
                    transaction: newTransaction
                })
            }
        ).catch(err => {
            console.log(err)
        })
    }


    private saveNews(news: NewsDto, ImageId,): CreateNewsDto{
        let newValue = {
            title: news.title,
            description: news.description,
            subTitle: news.subTitle,
            userId: news.userId,
            imageId: ImageId,
            eventId: news.eventId
        }
            
        return newValue as CreateNewsDto;
    }
}
