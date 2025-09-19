import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
        example: 'user@gmail.com', description: 'Email đã dùng xác thực OTP'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '654321', description: 'Mật khẩu mới'
    })
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}
