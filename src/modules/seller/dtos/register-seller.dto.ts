import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterSellerDto {
  @ApiProperty({ example: 'Công ty ABC', description: 'Tên công ty đăng ký' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'ABC Food', description: 'Tên thương hiệu' })
  @IsNotEmpty()
  @IsString()
  brandName: string;

  @ApiProperty({ example: '0905123456', description: 'Số điện thoại doanh nghiệp' })
  @IsNotEmpty()
  @IsString()
  businessPhone: string;

  @ApiProperty({ example: '123 Nguyễn Văn Linh, Đà Nẵng', description: 'Địa chỉ kinh doanh' })
  @IsNotEmpty()
  @IsString()
  businessAddress: string;

  @ApiProperty({ example: 'Chuyên phân phối thực phẩm sạch', description: 'Mô tả doanh nghiệp' })
  @IsNotEmpty()
  @IsString()
  description: string;
}