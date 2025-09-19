import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PermissionRepository } from "../repositories/permission.repository";
import { UpdateRolePermissionsDto } from "../dtos/updateRolePermissions.dto";
import { InitializeOnPreviewAllowlist } from "@nestjs/core";


@Injectable()
export class UpdatePermissionByRoleService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly permissionRepo: PermissionRepository,
    ) { }
    async updatePermissionByRole(roleID: number, permissions: UpdateRolePermissionsDto) {
        const permissionIds = permissions.permissions.map((p) => p.id);

        const validPermissions = await this.permissionRepo.validatePermissionIds(permissionIds)

        const validIds = new Set(validPermissions.map((p) => p.id));

        const invalidIds = permissionIds.filter((id) => !validIds.has(id));
        if (invalidIds.length > 0) {
            return errorResponse(400, `Các permissionId không tồn tại: ${invalidIds.join(', ')}`,);

        }
        await this.permissionRepo.updatePermissionByRole(roleID, permissions)
        return successResponse(200, 'Cập nhật quyền thành công');
    }
}