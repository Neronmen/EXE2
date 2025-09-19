import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class ResendOTPDTO {
    @ApiProperty({
        example: 'user@gmail.com', description: 'Email người dùng nhập lúc đầu'
    })
    @IsEmail()
    email: string
}