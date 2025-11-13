import { PrismaService } from 'src/libs/prisma/prisma.service';
import { UpdateRolePermissionsDto } from '../dtos/updateRolePermissions.dto';
export declare class PermissionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPermissionByRole(roleID: number): Promise<({
        permission: {
            description: string | null;
            id: number;
            code: string;
        };
        role: {
            description: string | null;
            id: number;
            name: string;
        };
    } & {
        id: number;
        roleId: number;
        permissionId: number;
        isActive: boolean;
    })[]>;
    updatePermissionByRole(roleID: number, permissions: UpdateRolePermissionsDto): Promise<void>;
    validatePermissionIds(permissionIds: any): Promise<{
        id: number;
    }[]>;
}
