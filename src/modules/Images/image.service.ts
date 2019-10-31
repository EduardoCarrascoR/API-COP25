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

    public async create(image: CreateImageDto): Promise<Image>{
        let value = await this.validateImage(image)
        if(value.valid===true){
            return await this.sequelizeInstance.transaction(
                async transaction => {
                    await this.imageRepository.create<Image>(image, {
                        transaction: transaction
                    
                    })
                }
            ).catch(err => {
                console.log(err)
            })
        }else{
            throw new MessageCodeError(value.error)
        }
    }

    private validateImage(image: CreateImageDto){
        let value = {
            valid: true,
            error:''
        }
        if(!image.name){ value.valid = false, value.error = 'image:create:missingName'}
        if(!image.Url){ value.valid = false, value.error = 'image:create:missingPath'}
        
        return value
    }
}
