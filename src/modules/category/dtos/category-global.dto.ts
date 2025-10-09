import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryGlobalDto {
    @ApiProperty({ example: "Trái cây tươi", description: "Tên danh mục toàn cục" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: "Các loại trái cây theo mùa", required: false })
    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdateCategoryGlobalDto extends PartialType(CreateCategoryGlobalDto) { }

export class FilterCategoryGlobalDto {
    @ApiPropertyOptional({ example: "trai cay", required: false })
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ example: "1", required: false })
    @IsOptional()
    page?: string;

    @ApiPropertyOptional({ example: "10", required: false })
    @IsOptional()
    limit?: string;

}
