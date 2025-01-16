import { IsEmail, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'Armando' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Alvarez Oviedo'})
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'email@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({
        type: AddressDto
    })
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}