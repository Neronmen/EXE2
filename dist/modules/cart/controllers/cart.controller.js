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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const cart_service_1 = require("../services/cart.service");
const add_to_cart_dto_1 = require("../dtos/add-to-cart.dto");
const update_cart_item_dto_1 = require("../dtos/update-cart-item.dto");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(user) {
        return this.cartService.getCart(user.id);
    }
    addItem(user, addToCartDto) {
        return this.cartService.addItemToCart(user.id, addToCartDto);
    }
    updateItem(user, itemId, updateCartItemDto) {
        return this.cartService.updateCartItem(user.id, itemId, updateCartItemDto);
    }
    removeItem(user, itemId) {
        return this.cartService.removeItemFromCart(user.id, itemId);
    }
};
exports.CartController = CartController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy giỏ hàng của tôi' }),
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Thêm sản phẩm vào giỏ hàng' }),
    (0, common_1.Post)('items'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addItem", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật số lượng sản phẩm trong giỏ hàng' }),
    (0, common_1.Put)('items/:itemId'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('itemId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateItem", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Xóa sản phẩm khỏi giỏ hàng' }),
    (0, common_1.Delete)('items/:itemId'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('itemId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeItem", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Controller)('api/v1/cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map