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
exports.SignUpDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SignUpDto {
    email;
    password;
    name;
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@gmail.com',
        description: 'Địa chỉ email duy nhất của người dùng',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'secret123',
        description: 'Mật khẩu có ít nhất 6 ký tự',
        minLength: 6,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.MinLength)(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Nguyễn Văn A',
        description: 'Tên hiển thị của người dùng (tùy chọn)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên không được để trống' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "name", void 0);
//# sourceMappingURL=signUp.dto.js.map