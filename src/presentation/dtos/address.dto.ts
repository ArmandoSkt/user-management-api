import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class AddressDto {
    @ApiProperty({ example: 'Avenida de la Revolución' })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({ example: 'Guadalajara' })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ example: 'Jalisco' })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ example: '44100' })
    @Length(5, 5)
    @IsString()
    @IsNotEmpty()
    zipCode: string;
}