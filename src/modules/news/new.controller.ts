import { Body, Controller, Get, Res, HttpStatus, Post, Param, Put, Delete } from "@nestjs/common";
import { MessageCodeError } from "../../shared/index";
import { NewService } from "./news.service";

@Controller('News')
export class NewsController {
    constructor(private readonly newsService: NewService) {}

    @Get()
    public async getNews(@Res() res) {
        const news = await this.newsService.findAll()
        return res.status(HttpStatus.OK).json(news)
    }

    @Post()
    public async create(@Body() body, @Res() res) {
        if(!body || (body && Object.keys(body).length === 0))
            throw new MessageCodeError('news:create:missingInformation')
            

        await this.newsService.create(body)
        
        return res.status(HttpStatus.CREATED).send().json('News Crated')
    }
}