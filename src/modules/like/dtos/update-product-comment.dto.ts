import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString, ArrayNotEmpty, ArrayUnique, IsInt } from "class-validator";

export class UpdateProductCommentDto {
    @ApiPropertyOptional({ description: 'Nội dung comment', example: 'Nội dung mới' })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiPropertyOptional({
        description: 'Danh sách ID ảnh cũ muốn xóa',
        example: [1, 2, 3],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({ each: true })
    @Transform(({ value }) => {
        if (!value) return [];
        return Array.isArray(value) ? value.map(v => Number(v)) : value.toString().split(',').map(v => Number(v));
    })
    deleteImageIds?: number[];
}
