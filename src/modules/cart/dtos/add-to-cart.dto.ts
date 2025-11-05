import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ description: 'ID của sản phẩm', example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ description: 'Số lượng sản phẩm', example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
