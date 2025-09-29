import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class LoginFacebookDto {
    @ApiProperty({ example: 'dsadsadsad', description: 'Token FB' })
    @IsNotEmpty()
    @IsString()
    accessTokenFB: string; 

    @ApiProperty({ example: '3232', description: 'User ID Facebook' })
    @IsNotEmpty()
    @IsString()
    userID: string;

    @ApiProperty({ example: 'user@gmail.com', description: 'Email Facebook' })
    @IsEmail()
    email: string;
}
