import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from '../../infrastructure/schemas/user.schema';
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";
import { UpdateUserDto } from "src/presentation/dtos/update-user.dto";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    async createUser( createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.userRepository.createUser(createUserDto as User);
        } catch (error) {
            throw new InternalServerErrorException('Error creating user: ' + error.message);
        }
    }
    
    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.findAllUsers();
    }

    async findUserById(id: string): Promise<User> {
        return this.validateUserExists(id);
    }

    async findUserAddress(id: string): Promise<User> {
        const user = await this.userRepository.findUserAddress(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.validateUserExists(id);

        try {
            return await this.userRepository.updateUser(id, updateUserDto as User);
        } catch (error) {
            throw new InternalServerErrorException('Error updating user: ' + error.message);
        }
    }

    async deleteUser(id: string): Promise<User> {
        await this.validateUserExists(id);
        try {
            return await this.userRepository.deleteUser(id);
        } catch (error) {
            throw new InternalServerErrorException(`Error deleting user with ID ${id}`);
        }
    }

    private async validateUserExists(id: string): Promise<User> {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    
}