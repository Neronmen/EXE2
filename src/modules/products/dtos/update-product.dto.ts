import {
    ApiPropertyOptional,
} from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsInt,
    IsArray,
    IsBoolean,
    IsNumber,
    ValidateNested,
    Min,
    IsEnum,
    ValidateIf,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import type { File as MulterFile } from 'multer';
import { Region, Condition, Season, CreatePricingTierDto } from './create-product.dto';

export class UpdateProductDto {
    // ----- Thông tin cơ bản -----
    @ApiPropertyOptional({ example: 3, description: 'ID danh mục chung' })
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsInt()
    categoryGlobalID?: number;

    @ApiPropertyOptional({ example: 5, description: 'ID danh mục riêng của shop' })
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsInt()
    categoryShopID?: number;

    @ApiPropertyOptional({ example: 'Xoài cát Hòa Lộc loại 1', description: 'Tên sản phẩm' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ example: 'Xoài ngon ngọt, hương vị tự nhiên', description: 'Mô tả chi tiết sản phẩm' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: 'Việt Nam', description: 'Xuất xứ sản phẩm' })
    @IsOptional()
    @IsString()
    origin?: string;

    @ApiPropertyOptional({ example: 'Công ty Nông sản A', description: 'Thương hiệu sản phẩm' })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiPropertyOptional({ example: 'Kg', description: 'Đơn vị tính' })
    @IsOptional()
    @IsString()
    unit?: string;

    // ----- Enum -----
    @ApiPropertyOptional({ enum: Region, isArray: true, example: ['MIEN_NAM'], description: 'Khu vực phân phối' })
    @IsOptional()
    @IsArray()
    @IsEnum(Region, { each: true })
    @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
    region?: Region[];

    @ApiPropertyOptional({ enum: Condition, isArray: true, example: ['FRESH'], description: 'Tình trạng sản phẩm' })
    @IsOptional()
    @IsArray()
    @IsEnum(Condition, { each: true })
    @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
    condition?: Condition[];

    @ApiPropertyOptional({ enum: Season, isArray: true, example: ['SUMMER'], description: 'Mùa vụ sản phẩm' })
    @IsOptional()
    @IsArray()
    @IsEnum(Season, { each: true })
    @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
    season?: Season[];

    // ----- Hướng dẫn -----
    @ApiPropertyOptional({ example: 'Bảo quản nơi khô ráo thoáng mát', description: 'Hướng dẫn bảo quản' })
    @IsOptional()
    @IsString()
    storageInstructions?: string;

    @ApiPropertyOptional({ example: 'Dùng trực tiếp sau khi rửa sạch', description: 'Hướng dẫn sử dụng' })
    @IsOptional()
    @IsString()
    usageInstructions?: string;

    @ApiPropertyOptional({ example: 'VietGAP', description: 'Chứng nhận chất lượng (nếu có)' })
    @IsOptional()
    @IsString()
    certifications?: string;

    // ----- Kho hàng & giá -----
    @ApiPropertyOptional({ example: 100, description: 'Số lượng tồn kho' })
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsInt()
    stock?: number;

    @ApiPropertyOptional({ example: 1, description: 'Số lượng tối thiểu khi đặt hàng' })
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsInt()
    @Min(1)
    minOrderQty?: number;

    @ApiPropertyOptional({ example: 120000, description: 'Giá bán cơ bản (VND)' })
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsNumber()
    basePrice?: number;

    // // ----- Ảnh sản phẩm -----
    // @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true, description: 'Danh sách file ảnh sản phẩm (upload trực tiếp). Ảnh đầu tiên là chính' })
    // @ValidateIf(() => false)
    // images?: MulterFile[];

    // ----- Bảng giá số lượng -----
    @ApiPropertyOptional({ example: '[{"minQty":10,"price":115000},{"minQty":50,"price":100000}]', type: 'string', description: 'Danh sách mức giá theo số lượng, JSON string' })
    @IsOptional()
    @Transform(({ value }) => {
        try {
            return JSON.parse(value);
        } catch {
            return undefined;
        }
    })
    @Type(() => CreatePricingTierDto)
    PricingTier?: CreatePricingTierDto[];

    // ----- Cờ trạng thái -----
    @ApiPropertyOptional({ example: true, description: 'Sản phẩm đang hoạt động hay không' })
    @IsOptional()
    @Transform(({ value }) => (value === 'true' || value === true ? true : false))
    @IsBoolean()
    isActive?: boolean;
}
