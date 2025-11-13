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
exports.OptionalJWTGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let OptionalJWTGuard = class OptionalJWTGuard {
    jwtService;
    prisma;
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            request.user = null;
            return true;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET_KEY,
            });
            const user = await this.prisma.user.findUnique({
                where: { id: payload.id },
            });
            if (!user || user.isDeleted) {
                request.user = null;
                return true;
            }
            request.user = { ...payload, roleID: user.roleID };
        }
        catch {
            request.user = null;
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.OptionalJWTGuard = OptionalJWTGuard;
exports.OptionalJWTGuard = OptionalJWTGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], OptionalJWTGuard);
//# sourceMappingURL=optional-jwt.guard.js.map