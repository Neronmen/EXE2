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
exports.UpdateOrderDto = exports.ADMIN_UPDATE_GROUP = exports.USER_UPDATE_GROUP = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
exports.USER_UPDATE_GROUP = 'user_update';
exports.ADMIN_UPDATE_GROUP = 'admin_update';
class UpdateOrderDto {
    status;
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.OrderStatus,
        example: client_1.OrderStatus.CANCELLED,
        description: 'Trạng thái mới của đơn hàng. User chỉ có thể hủy (CANCELLED). Admin có thể cập nhật các trạng thái khác.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.OrderStatus),
    (0, class_validator_1.IsIn)([client_1.OrderStatus.CANCELLED], { groups: [exports.USER_UPDATE_GROUP], message: 'Bạn chỉ có thể hủy đơn hàng.' }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "status", void 0);
//# sourceMappingURL=update-order.dto.js.map