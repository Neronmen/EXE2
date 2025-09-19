import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { UpdateRolePermissionItemDto, UpdateRolePermissionsDto } from '../dtos/updateRolePermissions.dto';

@Injectable()
export class PermissionRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getPermissionByRole(roleID: number) {
        console.log(roleID)
        return this.prisma.rolePermission.findMany({
            where: { roleId: Number(roleID) },
            include: { permission: true, role: true },
        });
    }


    async updatePermissionByRole(roleID: number, permissions: UpdateRolePermissionsDto) {
        const roleIDNum = Number(roleID);
        await this.prisma.$transaction(async (tx) => {
            for (const perm of permissions.permissions) {
                const existing = await tx.rolePermission.findFirst({
                    where: { roleId: roleIDNum, permissionId: perm.id },
                });

                if (existing) {
                    await tx.rolePermission.update({
                        where: { id: existing.id },
                        data: { isActive: perm.isActive },
                    });
                } else {
                    // Chỉ insert khi isActive = true, nếu false thì bỏ qua
                    if (perm.isActive) {
                        await tx.rolePermission.create({
                            data: { roleId: roleIDNum, permissionId: perm.id, isActive: true },
                        });
                    }
                }
            }
        });
    }


    async validatePermissionIds(permissionIds: any) {
        return await this.prisma.permission.findMany({
            where: { id: { in: permissionIds } },
            select: { id: true },
        });
    }

}
