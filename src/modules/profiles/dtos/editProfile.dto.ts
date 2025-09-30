import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsEnum } from "class-validator";


export class EditProfileDto {
    @ApiPropertyOptional({ description: "Tên người dùng" })
    @IsOptional()
    @IsString()
    name?: string;


    // @ApiPropertyOptional({ description: "Email" })
    // @IsOptional()
    // @IsEmail({}, { message: "Email không hợp lệ" })
    // email?: string;

    @ApiPropertyOptional({ description: "Số điện thoại" })
    @IsOptional()
    @IsString()
    phone?: string;
}
