import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class VerifyOtpEmailDto {


    @ApiProperty({
        example: '808080', description: 'Mã OTP hệ thống gửi về'
    })
    @IsNotEmpty()
    @Length(6, 6)
    otp: string;
}
