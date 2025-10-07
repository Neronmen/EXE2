import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, Min, Max, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateShopReviewDto {
  @ApiProperty({ example: 1, description: "ID của shop cần đánh giá" })
  @Type(() => Number) 
  @IsInt()
  sellerID: number;

  @ApiProperty({ example: 5, description: "Số sao (1-5)" })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: "Shop giao hàng nhanh và chất lượng" })
  @IsOptional()
  @IsString()
  comment?: string;
}