import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address } from "./address.schema";

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    email: string;

    @Prop({type: Address, required: true })
    address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);