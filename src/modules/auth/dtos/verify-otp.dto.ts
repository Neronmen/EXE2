import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class VerifyOtpDto {
    @ApiProperty({
        example: 'user@gmail.com', description: 'Email nhận mã otp'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '808080', description: 'Mã OTP hệ thống gửi về'
    })
    @IsNotEmpty()
    @Length(6, 6)
    otp: string;
}
