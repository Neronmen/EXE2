import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { AuthRepository } from '../repositories/auth.repository';
export declare class PermissionGuard implements CanActivate {
    private reflector;
    private prisma;
    private authRepo;
    constructor(reflector: Reflector, prisma: PrismaService, authRepo: AuthRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
