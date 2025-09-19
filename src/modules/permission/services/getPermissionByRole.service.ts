import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PermissionRepository } from "../repositories/permission.repository";


@Injectable()
export class GetPermissionByRoleService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly permissionRepo: PermissionRepository,
    ) { }
    async getPermissionByRole(roleID: number) {
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
        return successResponse(200, result, 'Lấy danh sách quyền thành công')
    }
}