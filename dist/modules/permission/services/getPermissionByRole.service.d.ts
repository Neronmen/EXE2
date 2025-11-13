import { JwtService } from "@nestjs/jwt";
import { PermissionRepository } from "../repositories/permission.repository";
export declare class GetPermissionByRoleService {
    private readonly jwtService;
    private readonly permissionRepo;
    constructor(jwtService: JwtService, permissionRepo: PermissionRepository);
    getPermissionByRole(roleID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
