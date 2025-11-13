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
exports.UpdateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_product_dto_1 = require("./create-product.dto");
class UpdateProductDto {
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
    PricingTier;
    isActive;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3, description: 'ID danh mục chung' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "categoryGlobalID", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'ID danh mục riêng của shop' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "categoryShopID", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Xoài cát Hòa Lộc loại 1', description: 'Tên sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Xoài ngon ngọt, hương vị tự nhiên', description: 'Mô tả chi tiết sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Việt Nam', description: 'Xuất xứ sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Công ty Nông sản A', description: 'Thương hiệu sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Kg', description: 'Đơn vị tính' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_product_dto_1.Region, isArray: true, example: ['MIEN_NAM'], description: 'Khu vực phân phối' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(create_product_dto_1.Region, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.split(',') : value)),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_product_dto_1.Condition, isArray: true, example: ['FRESH'], description: 'Tình trạng sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(create_product_dto_1.Condition, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.split(',') : value)),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_product_dto_1.Season, isArray: true, example: ['SUMMER'], description: 'Mùa vụ sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(create_product_dto_1.Season, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.split(',') : value)),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "season", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bảo quản nơi khô ráo thoáng mát', description: 'Hướng dẫn bảo quản' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "storageInstructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dùng trực tiếp sau khi rửa sạch', description: 'Hướng dẫn sử dụng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "usageInstructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'VietGAP', description: 'Chứng nhận chất lượng (nếu có)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100, description: 'Số lượng tồn kho' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Số lượng tối thiểu khi đặt hàng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "minOrderQty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120000, description: 'Giá bán cơ bản (VND)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : undefined)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '[{"minQty":10,"price":115000},{"minQty":50,"price":100000}]', type: 'string', description: 'Danh sách mức giá theo số lượng, JSON string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        try {
            return JSON.parse(value);
        }
        catch {
            return undefined;
        }
    }),
    (0, class_transformer_1.Type)(() => create_product_dto_1.CreatePricingTierDto),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "PricingTier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Sản phẩm đang hoạt động hay không' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === 'true' || value === true ? true : false)),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "isActive", void 0);
//# sourceMappingURL=update-product.dto.js.map