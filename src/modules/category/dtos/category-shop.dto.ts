import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";

export class CreateCategoryShopDto {
    @ApiProperty({ example: "Rau hữu cơ", description: "Tên danh mục trong shop" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: "Các loại rau trồng hữu cơ", required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: 1, description: "ID danh mục global liên kết", required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    categoryGlobalId?: number;
}

export class UpdateCategoryShopDto extends PartialType(CreateCategoryShopDto) { }

export class FilterCategoryShopDto {
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
