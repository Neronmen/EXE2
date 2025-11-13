"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = exports.CreatePricingTierDto = exports.Season = exports.Condition = exports.Region = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var Region;
(function (Region) {
    Region["MIEN_BAC"] = "MIEN_BAC";
    Region["MIEN_TRUNG"] = "MIEN_TRUNG";
    Region["MIEN_NAM"] = "MIEN_NAM";
    Region["TAY_NGUYEN"] = "TAY_NGUYEN";
})(Region || (exports.Region = Region = {}));
var Condition;
(function (Condition) {
    Condition["FRESH"] = "FRESH";
    Condition["PROCESSED"] = "PROCESSED";
    Condition["DRIED"] = "DRIED";
})(Condition || (exports.Condition = Condition = {}));
var Season;
(function (Season) {
    Season["SPRING"] = "SPRING";
    Season["SUMMER"] = "SUMMER";
    Season["AUTUMN"] = "AUTUMN";
    Season["WINTER"] = "WINTER";
})(Season || (exports.Season = Season = {}));
class CreatePricingTierDto {
    minQty;
    price;
}
exports.CreatePricingTierDto = CreatePricingTierDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Số lượng tối thiểu để áp dụng giá này' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePricingTierDto.prototype, "minQty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 95000, description: 'Giá áp dụng cho mức số lượng này' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePricingTierDto.prototype, "price", void 0);
class CreateProductDto {
    categoryGlobalID;
    categoryShopID;
    title;
    description;
    origin;
    brand;
    unit;
    region;
    condition;
    season;
    storageInstructions;
    usageInstructions;
    certifications;
    stock;
    minOrderQty;
    basePrice;
    images;
    PricingTier;
    isActive;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'ID danh mục chung' }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "categoryGlobalID", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'ID danh mục riêng của shop' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "categoryShopID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Xoài cát Hòa Lộc loại 1', description: 'Tên sản phẩm' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Xoài ngon ngọt, hương vị tự nhiên',
        description: 'Mô tả chi tiết sản phẩm',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Việt Nam', description: 'Xuất xứ sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Công ty Nông sản A', description: 'Thương hiệu sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Kg', description: 'Đơn vị tính' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Region,
        isArray: true,
        example: ['MIEN_NAM'],
        description: 'Khu vực phân phối (có thể chọn nhiều, nhấn ctrl để chọn nhiều nhé bạn iu)',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(Region, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.split(',') : value),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Condition,
        isArray: true,
        example: ['FRESH'],
        description: 'Tình trạng sản phẩm (tươi, khô, chế biến,nhấn ctrl để chọn nhiều nhé bạn iu)',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(Condition, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.split(',') : value),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Season,
        isArray: true,
        example: ['SUMMER'],
        description: 'Mùa vụ sản phẩm (có thể chọn nhiều, nhấn ctrl để chọn nhiều nhé bạn iu)',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(Season, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.split(',') : value),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "season", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Bảo quản nơi khô ráo thoáng mát',
        description: 'Hướng dẫn bảo quản',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "storageInstructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Dùng trực tiếp sau khi rửa sạch',
        description: 'Hướng dẫn sử dụng',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "usageInstructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'VietGAP', description: 'Chứng nhận chất lượng (nếu có)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Số lượng tồn kho' }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Số lượng tối thiểu khi đặt hàng' }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "minOrderQty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120000, description: 'Giá bán cơ bản (VND)' }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        format: 'binary',
        isArray: true,
        description: 'Danh sách file ảnh sản phẩm (upload trực tiếp). Ảnh đầu tiên được hiểu là ảnh chính (isMain = true)',
    }),
    (0, class_validator_1.ValidateIf)(() => false),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        description: 'Danh sách mức giá theo số lượng, truyền JSON string (ví dụ: `[{"minQty":10,"price":115000},{"minQty":50,"price":100000}]`)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        try {
            return JSON.parse(value);
        }
        catch {
            return undefined;
        }
    }),
    (0, class_transformer_1.Type)(() => CreatePricingTierDto),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "PricingTier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Sản phẩm đang hoạt động hay không' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true ? true : false),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-product.dto.js.map