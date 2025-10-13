import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetEmailDto {
    @ApiProperty({
        example: 'emailmoi@gmail.com', description: 'Email mới'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

}
