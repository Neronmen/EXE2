import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export enum ShopSortEnum {
  LATEST = "latest",
  OLDEST = "oldest",
  TOP_RATED = "topRated",
}

export class GetShopClientDto {
//   @ApiPropertyOptional({ enum: ["PENDING", "APPROVED", "REJECTED"], description: "Trạng thái shop" })
//   @IsOptional()
//   @IsString()
//   status?: string;

  @ApiPropertyOptional({ description: "Từ khóa tìm kiếm (brandName, companyName)" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ enum: ShopSortEnum, default: ShopSortEnum.LATEST })
  @IsOptional()
  @IsEnum(ShopSortEnum)
  sort?: ShopSortEnum = ShopSortEnum.LATEST;
}