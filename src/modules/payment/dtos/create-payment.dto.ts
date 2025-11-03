import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'ID của đơn hàng', example: 1 })
  @IsNotEmpty()
  @IsInt()
  orderId: number;
}
