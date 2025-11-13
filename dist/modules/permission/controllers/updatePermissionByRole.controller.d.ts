import { UpdateRolePermissionsDto } from "../dtos/updateRolePermissions.dto";
import { UpdatePermissionByRoleService } from "../services/updatePermissionByRole.service";
export declare class UpdatePermissonByRoleController {
    private readonly updatePermissionByRoleService;
    constructor(updatePermissionByRoleService: UpdatePermissionByRoleService);
    updatePermissionByRole(roleID: number, body: UpdateRolePermissionsDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
