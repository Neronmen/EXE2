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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let OrderRepository = class OrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tx, userId, addressId, totalAmount, items) {
        return tx.order.create({
            data: {
                userID: userId,
                addressID: addressId,
                totalAmount: totalAmount,
                paymentMethod: 'VNPAY',
                items: { createMany: { data: items } },
            },
            include: { items: true },
        });
    }
    async findAll(userId) {
        return this.prisma.order.findMany({
            where: { userID: userId },
            include: {
                items: true,
            },
        });
    }
    async findAllForAdmin() {
        return this.prisma.order.findMany({
            select: { totalAmount: true, status: true, id: true, createdAt: true, paymentMethod: true, user: { select: { name: true, email: true, phone: true, avatar: true } } },
        });
    }
    async findOne(id, userId) {
        const whereCondition = { id };
        if (userId) {
            whereCondition.userID = userId;
        }
        return this.prisma.order.findFirst({
            where: whereCondition,
            include: {
                address: true,
                items: {
                    select: {
                        productID: true,
                        quantity: true,
                        price: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: { where: { isMain: true }, select: { url: true } },
                                SellerProfile: { select: { companyName: true, slug: true, shopAvatar: true } },
                            },
                        },
                    },
                },
            },
        });
    }
    async update(id) {
        return this.prisma.order.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
    }
    async remove(id) {
        return this.prisma.order.delete({ where: { id } });
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderRepository);
//# sourceMappingURL=order.repository.js.map