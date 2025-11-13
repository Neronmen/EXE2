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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
const cart_repository_1 = require("../repositories/cart.repository");
let CartService = class CartService {
    prisma;
    cartRepository;
    constructor(prisma, cartRepository) {
        this.prisma = prisma;
        this.cartRepository = cartRepository;
    }
    async findOrCreateCart(userId) {
        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            const newCart = await this.cartRepository.create(userId);
            return { ...newCart, CartItem: [] };
        }
        return cart;
    }
    async getCart(userId) {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            const newCart = await this.findOrCreateCart(userId);
            return (0, response_util_1.successResponse)(200, { ...newCart, CartItem: [] }, 'Giỏ hàng của bạn đang trống.');
        }
        return (0, response_util_1.successResponse)(200, cart, 'Lấy giỏ hàng thành công.');
    }
    async addItemToCart(userId, addToCartDto) {
        const { productId, quantity } = addToCartDto;
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Sản phẩm không tồn tại.');
        if (product.stock < quantity)
            throw new common_1.BadRequestException('Không đủ hàng trong kho.');
        if (product.isDeleted)
            throw new common_1.BadRequestException('Sản phẩm đã bị xóa.');
        const cart = await this.findOrCreateCart(userId);
        const existingItem = await this.cartRepository.findItem(cart.id, productId);
        if (existingItem) {
            const updatedItem = await this.cartRepository.incrementItemQuantity(existingItem.id, quantity);
            return (0, response_util_1.successResponse)(200, updatedItem, 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công.');
        }
        else {
            const newItem = await this.cartRepository.createItem(cart.id, productId, quantity);
            return (0, response_util_1.successResponse)(201, newItem, 'Thêm sản phẩm vào giỏ hàng thành công.');
        }
    }
    async updateCartItem(userId, cartItemId, updateDto) {
        const cartItem = await this.cartRepository.findItemByIdAndUserId(cartItemId, userId);
        if (!cartItem)
            throw new common_1.NotFoundException('Sản phẩm không có trong giỏ hàng.');
        if (cartItem.Product.stock < updateDto.quantity)
            throw new common_1.BadRequestException('Không đủ hàng trong kho.');
        const updatedItem = await this.cartRepository.updateItemQuantity(cartItemId, updateDto.quantity);
        return (0, response_util_1.successResponse)(200, updatedItem, 'Cập nhật giỏ hàng thành công.');
    }
    async removeItemFromCart(userId, cartItemId) {
        const cartItem = await this.cartRepository.findItemByIdAndUserId(cartItemId, userId);
        if (!cartItem)
            throw new common_1.NotFoundException('Sản phẩm không có trong giỏ hàng.');
        await this.cartRepository.deleteItem(cartItemId);
        return (0, response_util_1.successResponse)(200, null, 'Xóa sản phẩm khỏi giỏ hàng thành công.');
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cart_repository_1.CartRepository])
], CartService);
//# sourceMappingURL=cart.service.js.map