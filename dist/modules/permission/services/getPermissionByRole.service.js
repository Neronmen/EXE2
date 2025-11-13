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
exports.GetPermissionByRoleService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const permission_repository_1 = require("../repositories/permission.repository");
let GetPermissionByRoleService = class GetPermissionByRoleService {
    jwtService;
    permissionRepo;
    constructor(jwtService, permissionRepo) {
        this.jwtService = jwtService;
        this.permissionRepo = permissionRepo;
    }
    async getPermissionByRole(roleID) {
        const permissionsByRole = await this.permissionRepo.getPermissionByRole(roleID);
        const result = {
            roleID: Number(roleID),
            permissions: permissionsByRole.map((rp) => ({
                id: rp.permission.id,
                code: rp.permission.code,
                description: rp.permission.description,
                isActive: rp.isActive
            })),
        };
        return (0, response_util_1.successResponse)(200, result, 'Lấy danh sách quyền thành công');
    }
};
exports.GetPermissionByRoleService = GetPermissionByRoleService;
exports.GetPermissionByRoleService = GetPermissionByRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        permission_repository_1.PermissionRepository])
], GetPermissionByRoleService);
//# sourceMappingURL=getPermissionByRole.service.js.map