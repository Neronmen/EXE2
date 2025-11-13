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
exports.RegisterSellerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegisterSellerDto {
    companyName;
    brandName;
    businessPhone;
    businessAddress;
    description;
}
exports.RegisterSellerDto = RegisterSellerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Công ty ABC', description: 'Tên công ty đăng ký' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterSellerDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ABC Food', description: 'Tên thương hiệu' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterSellerDto.prototype, "brandName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0905123456', description: 'Số điện thoại doanh nghiệp' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterSellerDto.prototype, "businessPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Nguyễn Văn Linh, Đà Nẵng', description: 'Địa chỉ kinh doanh' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterSellerDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Chuyên phân phối thực phẩm sạch', description: 'Mô tả doanh nghiệp' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterSellerDto.prototype, "description", void 0);
//# sourceMappingURL=register-seller.dto.js.map