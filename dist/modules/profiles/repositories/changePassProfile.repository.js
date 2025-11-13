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
exports.ChangePassProfileRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let ChangePassProfileRepository = class ChangePassProfileRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updatePassword(userID, hashNewPassword) {
        return this.prisma.user.update({
            where: { id: userID },
            data: {
                password: hashNewPassword
            },
            select: {
                id: true,
                email: true,
                phone: true,
                name: true,
                roleID: true,
            }
        });
    }
};
exports.ChangePassProfileRepository = ChangePassProfileRepository;
exports.ChangePassProfileRepository = ChangePassProfileRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChangePassProfileRepository);
//# sourceMappingURL=changePassProfile.repository.js.map