import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
    @ApiProperty({
        example: 'user@gmail.com', description: 'Email tài khoản muốn khôi phục'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}