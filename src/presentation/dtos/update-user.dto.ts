import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: 'Armando' })
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiProperty({ example: 'Alvarez Oviedo'})
    @IsString()
    @IsOptional()
    readonly lastName?: string;

    @ApiProperty({ example: 'email@email.com' })
    @IsEmail()
    @IsOptional()
    readonly email?: string;

}