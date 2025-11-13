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
exports.FilterCategoryShopDto = exports.UpdateCategoryShopDto = exports.CreateCategoryShopDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateCategoryShopDto {
    name;
    description;
    categoryGlobalId;
}
exports.CreateCategoryShopDto = CreateCategoryShopDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Rau hữu cơ", description: "Tên danh mục trong shop" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCategoryShopDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Các loại rau trồng hữu cơ", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCategoryShopDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: "ID danh mục global liên kết", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCategoryShopDto.prototype, "categoryGlobalId", void 0);
class UpdateCategoryShopDto extends (0, swagger_1.PartialType)(CreateCategoryShopDto) {
}
exports.UpdateCategoryShopDto = UpdateCategoryShopDto;
class FilterCategoryShopDto {
    search;
    page;
    limit;
}
exports.FilterCategoryShopDto = FilterCategoryShopDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "trai cay", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterCategoryShopDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "1", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterCategoryShopDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "10", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterCategoryShopDto.prototype, "limit", void 0);
//# sourceMappingURL=category-shop.dto.js.map