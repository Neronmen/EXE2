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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let AuthRepository = class AuthRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmailAndProvider(email, oauthProvider) {
        return this.prisma.user.findUnique({
            where: {
                email_oauthProvider: {
                    email,
                    oauthProvider,
                },
                isDeleted: false
            },
            include: {
                Role: {
                    include: {
                        permissions: {
                            include: { permission: true },
                        },
                    },
                },
            },
        });
    }
    async findByID(id) {
        return this.prisma.user.findUnique({
            where: { id: id, isDeleted: false },
            include: {
                Role: { include: { permissions: { include: { permission: true } } } },
            },
        });
    }
    async createNewUser(data) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                roleID: 6,
                oauthProvider: "local",
            }
        });
    }
    async createNewUserFacebook(data) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                roleID: 6,
                oauthProvider: "facebook",
                oauthID: data.oauthID,
                avatar: data.avatar
            }
        });
    }
    async createPasswordReset(userID, otpHash) {
        await this.prisma.passwordReset.create({
            data: {
                userID,
                otpHash,
                expiresAt: new Date(Date.now() + 3 * 60 * 1000)
            }
        });
    }
    async getPasswordReset(userID) {
        return await this.prisma.passwordReset.findFirst({
            where: {
                userID,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getPasswordResetNormal(userID) {
        return await this.prisma.passwordReset.findMany({
            where: {
                userID
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async updateAttempt(recordID) {
        await this.prisma.passwordReset.update({
            where: { id: recordID },
            data: { attempt: { increment: 1 } }
        });
    }
    async updateUsed(userID) {
        await this.prisma.passwordReset.update({
            where: { userID },
            data: { used: true }
        });
    }
    async updateUserAvatar(userID, newAvatar) {
        await this.prisma.user.update({
            where: { id: userID },
            data: { avatar: newAvatar }
        });
    }
    async updatePasswordByUser(userID, hashPassword) {
        await this.prisma.user.update({
            where: { id: userID },
            data: { password: hashPassword },
        });
    }
    async deleteRecordPasswordByUser(userID) {
        await this.prisma.passwordReset.deleteMany({
            where: { userID },
        });
    }
    async lastOTPByUser(userID) {
        return await this.prisma.passwordReset.findFirst({
            where: { userID },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map