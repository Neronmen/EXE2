import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({ description: 'Số lượng mới của sản phẩm', example: 5 })
  @IsInt()
  @Min(1)
  quantity: number;
}
