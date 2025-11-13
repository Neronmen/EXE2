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
exports.SignUpService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const auth_repository_1 = require("../repositories/auth.repository");
const EXPIRE_TIME = 3600 * 1000 * 24 * 7;
let SignUpService = class SignUpService {
    prisma;
    jwtService;
    authRepository;
    constructor(prisma, jwtService, authRepository) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.authRepository = authRepository;
    }
    async signup(dto) {
        const existUser = await this.authRepository.findByEmailAndProvider(dto.email, "local");
        if (existUser) {
            return (0, response_util_1.errorResponse)(400, "Email đã được sử dụng cho tài khoản local", "EMAIL_EXIST");
        }
        const hashPassword = await (0, bcrypt_1.hash)(dto.password, 10);
        dto.password = hashPassword;
        const newUser = await this.authRepository.createNewUser(dto);
        return (0, response_util_1.successResponse)(200, 'Tạo tài khoản thành công, vui lòng đăng nhập để tiếp tục');
    }
};
exports.SignUpService = SignUpService;
exports.SignUpService = SignUpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        auth_repository_1.AuthRepository])
], SignUpService);
//# sourceMappingURL=signup.service.js.map