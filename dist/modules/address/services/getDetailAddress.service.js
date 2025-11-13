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
exports.GetDetailAddressService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const address_repository_1 = require("../repository/address.repository");
let GetDetailAddressService = class GetDetailAddressService {
    prisma;
    jwtService;
    addRepo;
    constructor(prisma, jwtService, addRepo) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.addRepo = addRepo;
    }
    async getDetailAddress(id, user) {
        const address = await this.addRepo.findOneAddress(id, Number(user.id));
        if (!address) {
            return (0, response_util_1.errorResponse)(404, 'Không tìm thấy địa chỉ này', 'NOT_FOUND');
        }
        return (0, response_util_1.successResponse)(200, address, "Lấy chi tiết địa chỉ thành công");
    }
};
exports.GetDetailAddressService = GetDetailAddressService;
exports.GetDetailAddressService = GetDetailAddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        address_repository_1.AddressRepository])
], GetDetailAddressService);
//# sourceMappingURL=getDetailAddress.service.js.map