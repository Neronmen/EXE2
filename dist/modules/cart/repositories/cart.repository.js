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
exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let CartRepository = class CartRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserId(userId) {
        return await this.prisma.cart.findUnique({
            where: { userId: userId },
            include: {
                CartItem: {
                    include: {
                        Product: {
                            select: {
                                ProductImage: { where: { isMain: true }, select: { url: true } },
                                title: true,
                                slug: true,
                                basePrice: true,
                                stock: true,
                                PricingTier: true,
                                SellerProfile: { select: { companyName: true, slug: true, shopAvatar: true } },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    }
    async create(userId) {
        return this.prisma.cart.create({
            data: { userId: userId },
        });
    }
    async findItem(cartId, productId) {
        return this.prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId: cartId, productId: productId } },
        });
    }
    async findItemByIdAndUserId(cartItemId, userId) {
        return this.prisma.cartItem.findFirst({
            where: { id: cartItemId, Cart: { userId: userId } },
            include: { Product: true },
        });
    }
    async createItem(cartId, productId, quantity) {
        return this.prisma.cartItem.create({
            data: {
                cartId: cartId,
                productId: productId,
                quantity: quantity,
            },
        });
    }
    async updateItemQuantity(cartItemId, newQuantity) {
        return this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: newQuantity },
        });
    }
    async incrementItemQuantity(cartItemId, quantity) {
        return this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: { increment: quantity } },
        });
    }
    async deleteItem(cartItemId) {
        return this.prisma.cartItem.delete({ where: { id: cartItemId } });
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartRepository);
//# sourceMappingURL=cart.repository.js.map