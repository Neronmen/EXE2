import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Nguyễn Văn A', description: 'Tên người nhận' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: '0912345678', description: 'Số điện thoại' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Hà Nội', description: 'Tỉnh/Thành phố' })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({ example: 'Quận Cầu Giấy', description: 'Quận/Huyện' })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ example: 'Phường Dịch Vọng', description: 'Phường/Xã' })
  @IsNotEmpty()
  @IsString()
  ward: string;

  @ApiProperty({ example: 'Số 1 Trần Thái Tông', description: 'Đường/Số nhà' })
  @IsNotEmpty()
  @IsString()
  street: string;


  @ApiProperty({
    example: true,
    description: 'Đặt làm địa chỉ mặc định',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean; 
}
