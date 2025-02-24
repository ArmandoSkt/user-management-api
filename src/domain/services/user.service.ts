import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from '../../infrastructure/schemas/user.schema';
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";
import { UpdateUserDto } from "src/presentation/dtos/update-user.dto";
import { Address } from "src/infrastructure/schemas/address.schema";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    async createUser( createUserDto: CreateUserDto): Promise<User> {
        await this.validateUserEmailDoesNotExist(createUserDto.email);
        const genderDescription = await this.getGenderDescription(createUserDto.name);
        const userData = { ...createUserDto, genderDescription };
        try {
            return await this.userRepository.createUser(userData as User);
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

    async findUserAddress(id: string): Promise<Address> {
        const user = await this.validateUserExists(id);
        return user.address;
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

    private async validateUserEmailDoesNotExist(email: string): Promise<void> {
        const existingUser = await this.userRepository.findUserByEmail(email);
        if (existingUser) {
            throw new ConflictException(`User with email ${email} already exists`);
        }
    }

    private async getGenderDescription (name: string): Promise<string> {
        try {
            const response = await fetch(`https://api.genderize.io?name=${name}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch gender data: ${response.statusText}`);
            }
            const data = await response.json();
            const gender = data.gender || 'unknown';
            const probability = Math.round((data.probability || 0) * 100);
            return `${name} is ${gender} with ${probability}% certainty`;
        } catch (error) {
            console.error('Error fetching gender data from external API:', error.message);
            return 'unknown';
        }
    }
}