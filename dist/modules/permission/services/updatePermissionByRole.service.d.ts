import { JwtService } from "@nestjs/jwt";
import { PermissionRepository } from "../repositories/permission.repository";
import { UpdateRolePermissionsDto } from "../dtos/updateRolePermissions.dto";
export declare class UpdatePermissionByRoleService {
    private readonly jwtService;
    private readonly permissionRepo;
    constructor(jwtService: JwtService, permissionRepo: PermissionRepository);
    updatePermissionByRole(roleID: number, permissions: UpdateRolePermissionsDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
