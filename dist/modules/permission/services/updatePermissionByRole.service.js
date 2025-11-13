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
exports.UpdatePermissionByRoleService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const permission_repository_1 = require("../repositories/permission.repository");
let UpdatePermissionByRoleService = class UpdatePermissionByRoleService {
    jwtService;
    permissionRepo;
    constructor(jwtService, permissionRepo) {
        this.jwtService = jwtService;
        this.permissionRepo = permissionRepo;
    }
    async updatePermissionByRole(roleID, permissions) {
        const permissionIds = permissions.permissions.map((p) => p.id);
        const validPermissions = await this.permissionRepo.validatePermissionIds(permissionIds);
        const validIds = new Set(validPermissions.map((p) => p.id));
        const invalidIds = permissionIds.filter((id) => !validIds.has(id));
        if (invalidIds.length > 0) {
            return (0, response_util_1.errorResponse)(400, `Các permissionId không tồn tại: ${invalidIds.join(', ')}`);
        }
        await this.permissionRepo.updatePermissionByRole(roleID, permissions);
        return (0, response_util_1.successResponse)(200, 'Cập nhật quyền thành công');
    }
};
exports.UpdatePermissionByRoleService = UpdatePermissionByRoleService;
exports.UpdatePermissionByRoleService = UpdatePermissionByRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        permission_repository_1.PermissionRepository])
], UpdatePermissionByRoleService);
//# sourceMappingURL=updatePermissionByRole.service.js.map