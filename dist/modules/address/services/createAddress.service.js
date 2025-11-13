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
exports.CreateAddressService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const address_repository_1 = require("../repository/address.repository");
let CreateAddressService = class CreateAddressService {
    prisma;
    jwtService;
    addRepo;
    constructor(prisma, jwtService, addRepo) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.addRepo = addRepo;
    }
    async create(data, user) {
        const exists = await this.addRepo.checkAddressExist(data, Number(user.id));
        if (exists) {
            return (0, response_util_1.errorResponse)(400, 'Địa chỉ này đã tồn tại.', "ADDRESS_EXIST");
        }
        const address = await this.prisma.$transaction(async (tx) => {
            const count = await tx.address.count({ where: { userID: Number(user.id) } });
            let isDefault = data.isDefault ?? false;
            if (count === 0) {
                isDefault = true;
            }
            if (isDefault) {
                await tx.address.updateMany({
                    where: { userID: Number(user.id), isDefault: true },
                    data: { isDefault: false },
                });
            }
            return tx.address.create({
                data: {
                    ...data,
                    userID: Number(user.id),
                    isDefault,
                },
            });
        });
        return (0, response_util_1.successResponse)(200, address, "Tạo địa chỉ thành công");
    }
};
exports.CreateAddressService = CreateAddressService;
exports.CreateAddressService = CreateAddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        address_repository_1.AddressRepository])
], CreateAddressService);
//# sourceMappingURL=createAddress.service.js.map