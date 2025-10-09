import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsInt, IsString, Min, IsBoolean } from "class-validator";

export class GetAllProductQueryDto {
  @ApiPropertyOptional({ description: "Trang hiện tại", example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: "Số sản phẩm trên 1 trang", example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ description: "Từ khóa tìm kiếm", example: "Xoài" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: "ID danh mục toàn cầu", example: 7 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryGlobalID?: number;


  @ApiPropertyOptional({ description: "ID danh mục cửa hàng", example: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryShopID?: number;

  @ApiPropertyOptional({ description: "Chỉ lấy sản phẩm active/inactive", example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : undefined)
  isActive?: boolean;
}
