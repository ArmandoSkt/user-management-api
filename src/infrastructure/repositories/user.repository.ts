import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";

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

    async findUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }

    async updateUser(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async deleteUser(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }

}