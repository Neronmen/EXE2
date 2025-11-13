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
exports.UpdateRolePermissionsDto = exports.UpdateRolePermissionItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateRolePermissionItemDto {
    id;
    isActive;
}
exports.UpdateRolePermissionItemDto = UpdateRolePermissionItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID của quyền (permission)',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRolePermissionItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Trạng thái quyền: true = bật, false = tắt',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateRolePermissionItemDto.prototype, "isActive", void 0);
class UpdateRolePermissionsDto {
    permissions;
}
exports.UpdateRolePermissionsDto = UpdateRolePermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [UpdateRolePermissionItemDto],
        description: 'Danh sách quyền cần cập nhật cho role',
        example: [
            { id: 1, isActive: true },
            { id: 2, isActive: false },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateRolePermissionItemDto),
    __metadata("design:type", Array)
], UpdateRolePermissionsDto.prototype, "permissions", void 0);
//# sourceMappingURL=updateRolePermissions.dto.js.map