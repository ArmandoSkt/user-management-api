import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";

@Injectable()
export class UserRepository {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ){}

    async createUser(user: User): Promise<User> {
        return await this.userModel.create(user);
    }

    async findAllUsers(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findUserById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

    async findUserAddress(id: string): Promise<User> {
        return await this.userModel.findById(id).select('address');
    }

    async updateUser(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async deleteUser(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }

}