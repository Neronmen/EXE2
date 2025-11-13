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
exports.LoginFacebookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const auth_repository_1 = require("../repositories/auth.repository");
const EXPIRE_TIME = 60 * 5;
let LoginFacebookService = class LoginFacebookService {
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
    async loginFaceBook(body) {
        const { accessTokenFB, userID, email } = body;
        const url = `https://graph.facebook.com/${userID}?fields=id,name,email,picture.type(large)&access_token=${accessTokenFB}`;
        const res = await fetch(url);
        const fbUser = await res.json();
        if (fbUser.error) {
            throw new common_1.UnauthorizedException("Invalid Facebook token");
        }
        const userEmail = fbUser.email || email;
        if (!userEmail) {
            return (0, response_util_1.errorResponse)(400, "Không lấy được email từ Facebook", "NO_EMAIL");
        }
        let user = await this.authRepository.findByEmailAndProvider(userEmail, 'facebook');
        if (!user) {
            console.log(fbUser.id);
            console.log(fbUser.picture.data.url);
            const dataNewUserDB = {
                email: userEmail,
                name: fbUser.name,
                oauthID: fbUser.id,
                avatar: fbUser.picture.data.url
            };
            await this.authRepository.createNewUserFacebook(dataNewUserDB);
            user = await this.authRepository.findByEmailAndProvider(userEmail, 'facebook');
        }
        else {
            if (user.status === "BLOCKED") {
                return (0, response_util_1.errorResponse)(400, "Tài khoản đã bị khóa", "BLOCKED");
            }
            if (fbUser.picture?.data?.url && user.avatar !== fbUser.picture.data.url) {
                await this.authRepository.updateUserAvatar(user.id, fbUser.picture.data.url);
                user.avatar = fbUser.picture.data.url;
            }
        }
        const permissions = await this.getUserPermissions(user);
        const payload = { id: user.id, name: user.name, email: user.email, roleID: user.roleID };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '5m'
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
exports.LoginFacebookService = LoginFacebookService;
exports.LoginFacebookService = LoginFacebookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        auth_repository_1.AuthRepository])
], LoginFacebookService);
//# sourceMappingURL=login-facebook.service.js.map