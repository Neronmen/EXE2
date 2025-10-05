import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RejectRegisterSellersDto {
  @ApiProperty({
    description: "Lý do từ chối duyệt hồ sơ seller",
    example: "Giấy phép kinh doanh không hợp lệ",
  })
  @IsString({ message: "rejectionReason phải là chuỗi" })
  @IsNotEmpty({ message: "rejectionReason không được để trống" })
  rejectionReason: string;
}
