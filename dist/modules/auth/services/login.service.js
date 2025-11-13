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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const auth_repository_1 = require("../repositories/auth.repository");
const EXPIRE_TIME = 60 * 5;
let LoginService = class LoginService {
    prisma;
    jwtService;
    authRepository;
    constructor(prisma, jwtService, authRepository) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.authRepository = authRepository;
    }
    async getUserPermissions(user) {
        let permissions = user.Role.permissions
            .filter(rp => rp.isActive)
            .map(rp => rp.permission.code);
        return permissions;
    }
    async login(dto) {
        const user = await this.authRepository.findByEmailAndProvider(dto.email, 'local');
        if (!user) {
            return (0, response_util_1.errorResponse)(400, "Tài khoản không tồn tại", "NOT_FOUND");
        }
        else if (user.status === "BLOCKED") {
            return (0, response_util_1.errorResponse)(400, "Tài khoản đã bị vô hiệu hóa", "BLOCKED");
        }
        const verify = await (0, bcrypt_1.compare)(dto.password, user.password);
        if (!verify) {
            return (0, response_util_1.errorResponse)(400, "Mật khẩu không đúng", "INCORRECT_PASWORD");
        }
        const permissions = await this.getUserPermissions(user);
        const payload = { id: user.id, name: user.name, email: user.email, roleID: user.roleID };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '1h'
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY_REFRESH,
            expiresIn: '1d'
        });
        const { password, ...data } = user;
        const result = {
            id: data.id,
            roleID: data.roleID,
            email: data.email,
            name: data?.name ?? "",
            avatar: data?.avatar ?? "",
        };
        const total = {
            user: {
                ...result,
                permissions,
            },
            backendToken: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
            }
        };
        return (0, response_util_1.successResponse)(200, total, 'Đăng nhập thành công');
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        auth_repository_1.AuthRepository])
], LoginService);
//# sourceMappingURL=login.service.js.map