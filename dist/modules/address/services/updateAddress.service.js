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
exports.UpdateAddressService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const address_repository_1 = require("../repository/address.repository");
let UpdateAddressService = class UpdateAddressService {
    prisma;
    jwtService;
    addRepo;
    constructor(prisma, jwtService, addRepo) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.addRepo = addRepo;
    }
    async update(id, data, user) {
        const checkExist = await this.addRepo.findOneAddress(id, Number(user.id));
        if (!checkExist) {
            return (0, response_util_1.errorResponse)(400, 'Không tìm thấy địa chỉ này', 'NOT_FOUND');
        }
        if (data.isDefault === true) {
            await this.prisma.address.updateMany({
                where: {
                    userID: Number(user.id),
                    NOT: { id }
                },
                data: { isDefault: false }
            });
        }
        if (data.isDefault === false && checkExist.isDefault === true) {
            const otherDefault = await this.prisma.address.findFirst({
                where: {
                    userID: Number(user.id),
                    NOT: { id },
                    isDefault: true
                }
            });
            if (!otherDefault) {
                return (0, response_util_1.errorResponse)(400, 'Bạn phải có ít nhất một địa chỉ mặc định', 'NEED_DEFAULT');
            }
        }
        const addUpdate = await this.addRepo.updateAddress(data, id);
        return (0, response_util_1.successResponse)(200, addUpdate, "Cập nhật địa chỉ thành công");
    }
};
exports.UpdateAddressService = UpdateAddressService;
exports.UpdateAddressService = UpdateAddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        address_repository_1.AddressRepository])
], UpdateAddressService);
//# sourceMappingURL=updateAddress.service.js.map