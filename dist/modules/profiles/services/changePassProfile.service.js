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
exports.ChangePassProfileService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const changePassProfile_repository_1 = require("../repositories/changePassProfile.repository");
let ChangePassProfileService = class ChangePassProfileService {
    prisma;
    jwtService;
    changePassRepo;
    constructor(prisma, jwtService, changePassRepo) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.changePassRepo = changePassRepo;
    }
    async changePassProfile(userID, data, user) {
        const checkUser = await this.prisma.user.findUnique({
            where: { id: userID }
        });
        if (!checkUser) {
            return (0, response_util_1.errorResponse)(400, "User này không tồn tại trong hệ thống", "NOT_FOUND_USER");
        }
        if (userID !== user.id) {
            return (0, response_util_1.errorResponse)(400, "Không có quyền đổi mật khẩu của UserID này", "NOT_PERMISSION");
        }
        const isMatch = await (0, bcrypt_1.compare)(data.oldPassword, checkUser.password);
        if (!isMatch) {
            return (0, response_util_1.errorResponse)(400, "Mật khẩu cũ không chính xác", "WRONG_OLD_PASSWORD");
        }
        const isSameAsOld = await (0, bcrypt_1.compare)(data.newPassword, checkUser.password);
        if (isSameAsOld) {
            return (0, response_util_1.errorResponse)(400, "Mật khẩu mới không được trùng với mật khẩu cũ", "SAME_PASSWORD");
        }
        const hashNewPassword = await (0, bcrypt_1.hash)(data.newPassword, 10);
        const userUpdate = await this.changePassRepo.updatePassword(userID, hashNewPassword);
        return (0, response_util_1.successResponse)(200, userUpdate, "Thay đổi mật khẩu thành công");
    }
};
exports.ChangePassProfileService = ChangePassProfileService;
exports.ChangePassProfileService = ChangePassProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        changePassProfile_repository_1.ChangePassProfileRepository])
], ChangePassProfileService);
//# sourceMappingURL=changePassProfile.service.js.map