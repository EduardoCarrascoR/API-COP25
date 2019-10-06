import { Body, Controller, Get, Res, HttpStatus, Post, Param, Put, Delete } from "@nestjs/common";
import { MessageCodeError } from "../../shared/index";
import { UserService } from "./user.service";


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public async getUsers(@Res() res) {
        const users = await this.userService.findAll()
        return res.status(HttpStatus.OK).json(users)
    }

    @Post()
    public async create(@Body() body, @Res() res) {
        if(!body || (body && Object.keys(body).length === 0))
            throw new MessageCodeError('user:create:missingInformation')
            

        await this.userService.create(body)
        
        return res.status(HttpStatus.CREATED).send().json(HttpStatus.CREATED)
    }

    @Get(':id')
    public async getUser(@Param('id') id: number, @Res() res) {
        if(!id) throw new MessageCodeError('user:show:missingId')

        const user = await this.userService.findById(id)
        return res.status(HttpStatus.OK).json(user)
    }

    @Put(':id')
    public async update(@Body() body, @Param('id') id: number, @Res() res) {
        if(!id) throw new MessageCodeError('user:update:missingId')

        await this.userService.update(id, body)
        return res.status(HttpStatus.OK).send()
    }

    @Delete(':id')
    public async delete(@Param('id') id: number, @Res() res) {
        if(!id) throw new MessageCodeError('user:delete:missingId')

        await this. userService.delete(id)
        return res.status(HttpStatus.OK).send()
    }



}