import { Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { CreateImageDto } from "./dto/image.dto";
import { Image } from "./image.entity";

@Injectable()
export class ImageService {
    constructor(
        @Inject('ImageRepository') private readonly imageRepository: typeof Image,
        @Inject('SequelizeInstance') private readonly sequelizeInstance
    ) {}

    public async findAll(): Promise<Array<Image>> {
        return await this.imageRepository.findAll<Image>()
    }

    public async findById(id: number): Promise<Image> {
        return await this.imageRepository.findByPk<Image>(id)
    }

    public async findOne(options: Object): Promise<Image> {
        return await this.imageRepository.findOne<Image>(options)
    }
}
