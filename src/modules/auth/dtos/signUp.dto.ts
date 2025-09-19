import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Địa chỉ email duy nhất của người dùng',
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({
    example: 'secret123',
    description: 'Mật khẩu có ít nhất 6 ký tự',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @ApiPropertyOptional({
    example: 'Nguyễn Văn A',
    description: 'Tên hiển thị của người dùng (tùy chọn)',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name?: string;
}
