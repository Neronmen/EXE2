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
exports.DeleteAddressService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const address_repository_1 = require("../repository/address.repository");
let DeleteAddressService = class DeleteAddressService {
    prisma;
    jwtService;
    addRepo;
    constructor(prisma, jwtService, addRepo) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.addRepo = addRepo;
    }
    async delete(id, user) {
        const checkExist = await this.addRepo.findOneAddress(id, Number(user.id));
        if (!checkExist) {
            return (0, response_util_1.errorResponse)(400, 'Không tìm thấy địa chỉ này', 'NOT_FOUND');
        }
        const adddressDele = await this.addRepo.deleteAddress(id);
        if (checkExist.isDefault) {
            const another = await this.prisma.address.findFirst({
                where: { userID: Number(user.id) },
                orderBy: { createdAt: 'asc' },
                select: { id: true }
            });
            if (another) {
                await this.prisma.address.update({
                    where: { id: another.id },
                    data: { isDefault: true }
                });
            }
        }
        return (0, response_util_1.successResponse)(200, adddressDele, 'Xóa địa chỉ thành công');
    }
};
exports.DeleteAddressService = DeleteAddressService;
exports.DeleteAddressService = DeleteAddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        address_repository_1.AddressRepository])
], DeleteAddressService);
//# sourceMappingURL=deleteAddress.service.js.map