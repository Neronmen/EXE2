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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("../repositories/order.repository");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
const client_1 = require("@prisma/client");
let OrderService = class OrderService {
    orderRepository;
    prisma;
    constructor(orderRepository, prisma) {
        this.orderRepository = orderRepository;
        this.prisma = prisma;
    }
    async _createOrderLogic(tx, userId, createOrderDto) {
        let totalAmount = 0;
        const orderItemsData = [];
        const address = await tx.address.findFirst({
            where: { id: createOrderDto.addressId, userID: userId },
        });
        if (!address) {
            throw new common_1.BadRequestException(`Địa chỉ với ID ${createOrderDto.addressId} không hợp lệ hoặc không thuộc về bạn.`);
        }
        for (const item of createOrderDto.items) {
            const product = await tx.product.findUnique({
                where: { id: item.productId },
                include: { PricingTier: true },
            });
            if (!product)
                throw new common_1.NotFoundException(`Sản phẩm với ID ${item.productId} không tồn tại.`);
            if (product.stock < item.quantity)
                throw new common_1.BadRequestException(`Không đủ hàng cho sản phẩm '${product.title}'.`);
            let finalPrice = product.basePrice;
            const pricingTier = product.PricingTier.sort((a, b) => b.minQty - a.minQty).find((tier) => item.quantity >= tier.minQty);
            if (pricingTier)
                finalPrice = pricingTier.price;
            totalAmount += finalPrice * item.quantity;
            orderItemsData.push({ productId: item.productId, quantity: item.quantity, price: finalPrice });
            await tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } },
            });
        }
        const order = await this.orderRepository.create(tx, userId, createOrderDto.addressId, totalAmount, orderItemsData.map((item) => ({ productID: item.productId, quantity: item.quantity, price: item.price })));
        return order;
    }
    async createFromCart(userId, createOrderFromCartDto) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                CartItem: {
                    include: {
                        Product: true,
                    },
                },
            },
        });
        if (!cart || cart.CartItem.length === 0) {
            throw new common_1.BadRequestException('Giỏ hàng của bạn đang trống.');
        }
        cart.CartItem.forEach(item => {
            if (item.Product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Không đủ hàng cho sản phẩm '${item.Product.title}'.`);
            }
        });
        const createOrderDto = {
            addressId: createOrderFromCartDto.addressId,
            items: cart.CartItem.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };
        const orderResult = await this.prisma.$transaction(async (tx) => {
            const order = await this._createOrderLogic(tx, userId, createOrderDto);
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
            return order;
        });
        return (0, response_util_1.successResponse)(201, orderResult, 'Tạo đơn hàng từ giỏ hàng thành công.');
    }
    async create(userId, createOrderDto) {
        return this.prisma.$transaction(async (tx) => {
            const order = await this._createOrderLogic(tx, userId, createOrderDto);
            return (0, response_util_1.successResponse)(201, order, 'Tạo đơn hàng thành công.');
        });
    }
    async findAll(userId) {
        const orders = await this.orderRepository.findAll(userId);
        return (0, response_util_1.successResponse)(200, orders, 'Lấy danh sách đơn hàng thành công.');
    }
    async findOne(id, userId) {
        const order = await this.orderRepository.findOne(id, userId);
        if (!order) {
            throw new common_1.NotFoundException(`Đơn hàng với ID ${id} không tồn tại hoặc không có quyền truy cập.`);
        }
        return (0, response_util_1.successResponse)(200, order, 'Lấy chi tiết đơn hàng thành công.');
    }
    async update(id, userId, updateOrderDto) {
        return this.prisma.$transaction(async (tx) => {
            const order = await tx.order.findFirst({
                where: { id, userID: userId },
                include: { items: true },
            });
            if (!order) {
                throw new common_1.NotFoundException(`Đơn hàng với ID ${id} không tồn tại hoặc bạn không có quyền truy cập.`);
            }
            const initialStatus = order.status;
            if (order.status !== client_1.OrderStatus.PENDING) {
                return (0, response_util_1.errorResponse)(400, "Không thể hủy đơn hàng");
            }
            if (order.status === client_1.OrderStatus.PENDING) {
                for (const item of order.items) {
                    await tx.product.update({
                        where: { id: item.productID },
                        data: { stock: { increment: item.quantity } },
                    });
                }
            }
            await this.orderRepository.update(id);
            const updatedOrder = await tx.order.findUnique({ where: { id } });
            return (0, response_util_1.successResponse)(200, updatedOrder, 'Cập nhật đơn hàng thành công.');
        });
    }
    async remove(id, userId) {
        const order = await this.prisma.order.findFirst({
            where: { id, userID: userId },
            include: { items: true },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Đơn hàng với ID ${id} không tồn tại hoặc bạn không có quyền xóa.`);
        }
        await this.prisma.$transaction(async (tx) => {
            if (order.status === client_1.OrderStatus.PENDING) {
                for (const item of order.items) {
                    await tx.product.update({
                        where: { id: item.productID },
                        data: { stock: { increment: item.quantity } },
                    });
                }
            }
            await this.orderRepository.remove(id);
        });
        return (0, response_util_1.successResponse)(200, null, 'Xóa đơn hàng thành công.');
    }
    async findAllForAdmin() {
        const orders = await this.orderRepository.findAllForAdmin();
        return (0, response_util_1.successResponse)(200, orders, 'Lấy tất cả đơn hàng thành công.');
    }
    async removeForAdmin(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Đơn hàng với ID ${id} không tồn tại.`);
        }
        await this.prisma.$transaction(async (tx) => {
            if (order.status !== client_1.OrderStatus.CANCELLED) {
                for (const item of order.items) {
                    await tx.product.update({
                        where: { id: item.productID },
                        data: { stock: { increment: item.quantity } },
                    });
                }
            }
            await this.orderRepository.remove(id);
        });
        return (0, response_util_1.successResponse)(200, null, '[Admin] Xóa đơn hàng thành công.');
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map