import { Body, Controller, Get, Res, HttpStatus, Post, Param, Put, Delete } from "@nestjs/common";
import { MessageCodeError } from "../../shared/index";
import { ImageService } from "./image.service";

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    public async getImages(@Res() res) {
        const images = await this.imageService.findAll()
        return res.status(HttpStatus.OK).json(images)
    }

    @Post()
    public async create(@Body() body, @Res() res) {
        if(!body || (body && Object.keys(body).length === 0))
            throw new MessageCodeError('image:create:missingInformation')
            

        await this.imageService.create(body)
        
        return res.status(HttpStatus.CREATED).send().json(HttpStatus.CREATED)
    }

    @Get('/:id')
    public async getUser(@Param('id') id, @Res() res) {
        const image = await this.imageService.findById(id)
        if(!image) throw new MessageCodeError('image:show:missingId')

        return res.status(HttpStatus.OK).json(image)
    }

}
