import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address } from "./address.schema";

@Schema({
    timestamps: true
})
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({type: Address, required: true })
    address: Address;

    @Prop({ required: true })
    genderDescription : string;
}

export const UserSchema = SchemaFactory.createForClass(User);