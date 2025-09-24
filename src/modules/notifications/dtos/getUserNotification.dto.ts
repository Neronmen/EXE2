import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class GetUserNotificationQueryDto {
    @ApiProperty({
        description: 'Số bản ghi cần bỏ qua (phân trang)',
        example: 0,
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    skip?: number = 0;

    @ApiProperty({
        description: 'Số bản ghi cần lấy (phân trang). Nếu = -1 thì lấy toàn bộ',
        example: 20,
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    take?: number = 20;
}
