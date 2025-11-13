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
exports.GetShopClientDto = exports.ShopSortEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var ShopSortEnum;
(function (ShopSortEnum) {
    ShopSortEnum["LATEST"] = "latest";
    ShopSortEnum["OLDEST"] = "oldest";
    ShopSortEnum["TOP_RATED"] = "topRated";
})(ShopSortEnum || (exports.ShopSortEnum = ShopSortEnum = {}));
class GetShopClientDto {
    search;
    page = 1;
    limit = 10;
    sort = ShopSortEnum.LATEST;
}
exports.GetShopClientDto = GetShopClientDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Từ khóa tìm kiếm (brandName, companyName)" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetShopClientDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetShopClientDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetShopClientDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ShopSortEnum, default: ShopSortEnum.LATEST }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ShopSortEnum),
    __metadata("design:type", String)
], GetShopClientDto.prototype, "sort", void 0);
//# sourceMappingURL=get-shop-client.dto.js.map