import {
    ApiProperty,
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

export enum Region {
    MIEN_BAC = 'MIEN_BAC',
    MIEN_TRUNG = 'MIEN_TRUNG',
    MIEN_NAM = 'MIEN_NAM',
    TAY_NGUYEN = 'TAY_NGUYEN',
}

export enum Condition {
    FRESH = 'FRESH',
    PROCESSED = 'PROCESSED',
    DRIED = 'DRIED',
}

export enum Season {
    SPRING = 'SPRING',
    SUMMER = 'SUMMER',
    AUTUMN = 'AUTUMN',
    WINTER = 'WINTER',
}

export class CreatePricingTierDto {
    @ApiProperty({ example: 10, description: 'Số lượng tối thiểu để áp dụng giá này' })
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    minQty: number;

    @ApiProperty({ example: 95000, description: 'Giá áp dụng cho mức số lượng này' })
    @Transform(({ value }) => Number(value))
    @IsInt()
    price: number;
}

export class CreateProductDto {
    // ----- Thông tin cơ bản -----
    @ApiProperty({ example: 3, description: 'ID danh mục chung' })
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsInt()
    categoryGlobalID: number;

    @ApiPropertyOptional({ example: 5, description: 'ID danh mục riêng của shop' })
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsInt()
    categoryShopID?: number;

    @ApiProperty({ example: 'Xoài cát Hòa Lộc loại 1', description: 'Tên sản phẩm' })
    @IsString()
    title: string;

    @ApiPropertyOptional({
        example: 'Xoài ngon ngọt, hương vị tự nhiên',
        description: 'Mô tả chi tiết sản phẩm',
    })
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
    @ApiProperty({
        enum: Region,
        isArray: true,
        example: ['MIEN_NAM'],
        description: 'Khu vực phân phối (có thể chọn nhiều, nhấn ctrl để chọn nhiều nhé bạn iu)',
    })
    @IsArray()
    @IsEnum(Region, { each: true })
    @Transform(({ value }) =>
        typeof value === 'string' ? value.split(',') : value,
    )
    region: Region[];

    @ApiProperty({
        enum: Condition,
        isArray: true,
        example: ['FRESH'],
        description: 'Tình trạng sản phẩm (tươi, khô, chế biến,nhấn ctrl để chọn nhiều nhé bạn iu)',
    })
    @IsArray()
    @IsEnum(Condition, { each: true })
    @Transform(({ value }) =>
        typeof value === 'string' ? value.split(',') : value,
    )
    condition: Condition[];

    @ApiProperty({
        enum: Season,
        isArray: true,
        example: ['SUMMER'],
        description: 'Mùa vụ sản phẩm (có thể chọn nhiều, nhấn ctrl để chọn nhiều nhé bạn iu)',
    })
    @IsArray()
    @IsEnum(Season, { each: true })
    @Transform(({ value }) =>
        typeof value === 'string' ? value.split(',') : value,
    )
    season: Season[];

    // ----- Hướng dẫn -----
    @ApiPropertyOptional({
        example: 'Bảo quản nơi khô ráo thoáng mát',
        description: 'Hướng dẫn bảo quản',
    })
    @IsOptional()
    @IsString()
    storageInstructions?: string;

    @ApiPropertyOptional({
        example: 'Dùng trực tiếp sau khi rửa sạch',
        description: 'Hướng dẫn sử dụng',
    })
    @IsOptional()
    @IsString()
    usageInstructions?: string;

    @ApiPropertyOptional({ example: 'VietGAP', description: 'Chứng nhận chất lượng (nếu có)' })
    @IsOptional()
    @IsString()
    certifications?: string;

    // ----- Kho hàng & giá -----
    @ApiProperty({ example: 100, description: 'Số lượng tồn kho' })
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsInt()
    stock: number;

    @ApiProperty({ example: 1, description: 'Số lượng tối thiểu khi đặt hàng' })
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsInt()
    @Min(1)
    minOrderQty: number;

    @ApiProperty({ example: 120000, description: 'Giá bán cơ bản (VND)' })
    @Transform(({ value }) => (value ? Number(value) : undefined))
    @IsNumber()
    basePrice: number;

    // ----- Ảnh sản phẩm -----
    @ApiPropertyOptional({
        type: 'string',
        format: 'binary',
        isArray: true,
        description:
            'Danh sách file ảnh sản phẩm (upload trực tiếp). Ảnh đầu tiên được hiểu là ảnh chính (isMain = true)',
    })
    @ValidateIf(() => false)
    images?: MulterFile[];

    // ----- Bảng giá số lượng -----
    @ApiPropertyOptional({
        type: 'string',
        description:
            'Danh sách mức giá theo số lượng, truyền JSON string (ví dụ: `[{"minQty":10,"price":115000},{"minQty":50,"price":100000}]`)',
    })
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
    @Transform(({ value }) =>
        value === 'true' || value === true ? true : false,
    )
    @IsBoolean()
    isActive?: boolean;
}
