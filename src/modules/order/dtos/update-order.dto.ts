import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsIn, IsInt, IsOptional } from 'class-validator';

// Định nghĩa các nhóm validation
export const USER_UPDATE_GROUP = 'user_update';
export const ADMIN_UPDATE_GROUP = 'admin_update';

export class UpdateOrderDto {
  @ApiProperty({
    enum: OrderStatus,
    example: OrderStatus.CANCELLED,
    description: 'Trạng thái mới của đơn hàng. User chỉ có thể hủy (CANCELLED). Admin có thể cập nhật các trạng thái khác.',
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  @IsIn([OrderStatus.CANCELLED], { groups: [USER_UPDATE_GROUP], message: 'Bạn chỉ có thể hủy đơn hàng.' })
  status?: OrderStatus;

  
}
