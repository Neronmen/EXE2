import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsInt, IsString, Min, IsBoolean } from "class-validator";

export class GetAllCommentProductClientQueryDto {
    @ApiPropertyOptional({ description: "Trang hiện tại", example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({ description: "Số binh luan trên 1 trang", example: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

}
