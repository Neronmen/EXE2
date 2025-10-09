import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadProductImagesDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
    description: 'Danh sách ảnh sản phẩm cần upload',
  })
  @IsNotEmpty()
  files: any[];
}
