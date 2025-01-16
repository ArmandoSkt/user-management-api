import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "src/domain/services/user.service";
import { CreateUserDto } from "../dtos/create-user.dto";


@Controller('api/v1/users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Get()
    async findAllUsers() {
        return await this.userService.findAllUsers();
    }

    @Get(':id')
    async findUserById(@Param('id') id: string) {
        return await this.userService.findUserById(id);
    }

    @Get(':id/address')
    async findUserAddress(@Param('id') id: string) {
        return await this.userService.findUserAddress(id);
    }


    @Put(':id')
    async updateUser(@Param() id: string, @Body() updateUserDto: CreateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param() id: string) {
        return await this.userService.deleteUser(id);
    }

}