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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permission_decorator_1 = require("./permission.decorator");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const auth_repository_1 = require("../repositories/auth.repository");
let PermissionGuard = class PermissionGuard {
    reflector;
    prisma;
    authRepo;
    constructor(reflector, prisma, authRepo) {
        this.reflector = reflector;
        this.prisma = prisma;
        this.authRepo = authRepo;
    }
    async canActivate(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(permission_decorator_1.PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermissions)
            return true;
        const { user } = context.switchToHttp().getRequest();
        if (!user)
            throw new common_1.ForbiddenException("Unauthorized");
        const dbUser = await this.authRepo.findByID(user.id);
        if (!dbUser)
            throw new common_1.ForbiddenException("User not found");
        const userPermissions = dbUser.Role.permissions
            .filter((rp) => rp.isActive)
            .map((rp) => rp.permission.code);
        const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));
        if (!hasPermission) {
            throw new common_1.ForbiddenException("You do not have permission to access this resource");
        }
        return true;
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, prisma_service_1.PrismaService, auth_repository_1.AuthRepository])
], PermissionGuard);
//# sourceMappingURL=permissions.guard.js.map