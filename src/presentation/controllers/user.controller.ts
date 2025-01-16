import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "src/domain/services/user.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "../dtos/update-user.dto";

@ApiTags('Users')
@Controller('api/v1/users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto, description: 'User creation data' })
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 409, description: 'User with email ***** already exists' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200 })
    async findAllUsers() {
        return await this.userService.findAllUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({ name: 'id', description: 'Unique identifier of the user', example: '6788c97592d55aee4616253e' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async findUserById(@Param('id') id: string) {
        return await this.userService.findUserById(id);
    }

    @Get(':id/address')
    @ApiOperation({ summary: 'Get a user address by ID' })
    @ApiParam({ name: 'id', description: 'Unique identifier of the user', example: '6788c97592d55aee4616253e' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async findUserAddress(@Param('id') id: string) {
        return await this.userService.findUserAddress(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiParam({ name: 'id', description: 'Unique identifier of the user', example: '6788c97592d55aee4616253e' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiBody({ type: UpdateUserDto, description: 'Updated user data' })
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiParam({ name: 'id', description: 'Unique identifier of the user', example: '6788c97592d55aee4616253e' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return { message: 'User deleted successfully' };
    }

}