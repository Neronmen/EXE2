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
exports.AddressRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let AddressRepository = class AddressRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllAddress(userID) {
        return await this.prisma.address.findMany({
            where: { userID },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOneAddress(id, userID) {
        return await this.prisma.address.findUnique({
            where: { id, userID },
        });
    }
    async findDefault(userID) {
        return await this.prisma.address.findFirst({
            where: {
                userID,
                isDefault: true,
            },
        });
    }
    async deleteAddress(id) {
        return await this.prisma.address.delete({
            where: { id },
        });
    }
    async createAddress(data, userID) {
        return await this.prisma.address.create({
            data: {
                ...data,
                userID
            }
        });
    }
    async updateAddress(data, id) {
        return await this.prisma.address.update({
            where: { id },
            data: {
                ...data
            }
        });
    }
    async updateAddressNotDefault(userID) {
        return await this.prisma.address.updateMany({
            where: { userID },
            data: { isDefault: false },
        });
    }
    async updateAddressDefault(id) {
        return await this.prisma.address.update({
            where: { id },
            data: { isDefault: true },
        });
    }
    async checkAddressExist(data, userID) {
        return await this.prisma.address.findFirst({
            where: {
                userID,
                fullName: data.fullName,
                phone: data.phone,
                province: data.province,
                district: data.district,
                ward: data.ward,
                street: data.street,
            },
            select: {
                id: true
            }
        });
    }
};
exports.AddressRepository = AddressRepository;
exports.AddressRepository = AddressRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressRepository);
//# sourceMappingURL=address.repository.js.map