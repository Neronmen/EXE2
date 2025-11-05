import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderFromCartDto {
  @ApiProperty({ description: 'ID của địa chỉ giao hàng', example: 1 })
  @IsInt()
  @IsNotEmpty()
  addressId: number;
}