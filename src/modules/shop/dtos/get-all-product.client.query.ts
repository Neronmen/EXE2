import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsInt, IsString, Min, IsBoolean } from "class-validator";

export class GetAllProductClientQueryDto {
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

}
