import { GetPermissionByRoleService } from "../services/getPermissionByRole.service";
export declare class GetPermissonByRoleController {
    private readonly getPermissionByRoleService;
    constructor(getPermissionByRoleService: GetPermissionByRoleService);
    getPermissionByRole(roleID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
