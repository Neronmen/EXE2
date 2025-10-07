import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateShopReviewDto {
  @ApiPropertyOptional({ example: 5, description: "Điểm đánh giá (1-5)" })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "rating must be an integer number" })
  @Min(1, { message: "rating must not be less than 1" })
  @Max(5, { message: "rating must not be greater than 5" })
  rating?: number;

  @ApiPropertyOptional({ example: "Sản phẩm tốt lắm!", description: "Bình luận" })
  @IsOptional()
  @IsString()
  comment?: string;
}