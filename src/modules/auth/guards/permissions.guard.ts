import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector, private prisma: PrismaService, private authRepo: AuthRepository) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions =
            this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

        if (!requiredPermissions) return true;

        const { user } = context.switchToHttp().getRequest();
        if (!user) throw new ForbiddenException("Unauthorized");

        // Truy vấn permission mới nhất từ DB
        const dbUser = await this.authRepo.findByID(user.id)
        // const dbUser = await this.prisma.user.findUnique({
        //     where: { id: user.id },
        //     include: {
        //         Role: { include: { permissions: { include: { permission: true } } } },
        //     },
        // });

        if (!dbUser) throw new ForbiddenException("User not found");

        const userPermissions = dbUser.Role.permissions
            .filter((rp) => rp.isActive)
            .map((rp) => rp.permission.code);

        const hasPermission = requiredPermissions.every((perm) =>
            userPermissions.includes(perm),
        );
        if (!hasPermission) {
            throw new ForbiddenException(
                "You do not have permission to access this resource",
            );
        }

        return true;
    }
}
