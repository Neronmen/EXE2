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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("../services/order.service");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const create_order_from_cart_dto_1 = require("../dtos/create-order-from-cart.dto");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const role_enum_1 = require("./role.enum");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    createFromCart(user, createOrderFromCartDto) {
        return this.orderService.createFromCart(user.id, createOrderFromCartDto);
    }
    findAll(user) {
        return this.orderService.findAll(user.id);
    }
    findOne(user, id) {
        return this.orderService.findOne(id, user.id);
    }
    remove(user, id) {
        return this.orderService.remove(id, user.id);
    }
    findAllForAdmin() {
        return this.orderService.findAllForAdmin();
    }
    findOneForAdmin(id) {
        return this.orderService.findOne(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Tạo đơn hàng từ giỏ hàng' }),
    (0, common_1.Post)('from-cart'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_from_cart_dto_1.CreateOrderFromCartDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createFromCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả đơn hàng của tôi' }),
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết đơn hàng' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Xóa đơn hàng (Soft delete)' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Lấy tất cả đơn hàng trên hệ thống' }),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)('admin/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAllForAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Lấy chi tiết đơn hàng bất kỳ' }),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)('admin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOneForAdmin", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Controller)('api/v1/orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map