import { IsEmail, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}