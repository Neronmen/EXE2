import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsEnum, MinLength } from "class-validator";


export class ChangePassProfileDto {
    @ApiPropertyOptional({ description: "Mật khẩu mới", example: "12345a@!" })   
    @IsString()
    @MinLength(6)
    newPassword: string;  
}
