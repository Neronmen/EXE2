import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @ApiProperty({ required: false, default: 0, description: 'Số mục bỏ qua' })
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) skip: number = 0;

  @ApiProperty({ required: false, default: 10, description: 'Số mục cần lấy' })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) take: number = 10;
}