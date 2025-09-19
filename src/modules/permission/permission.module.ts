import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { GetPermissonByRoleController } from './controllers/getPermissionByRole.controller';
import { PermissionRepository } from './repositories/permission.repository';
import { GetPermissionByRoleService } from './services/getPermissionByRole.service';
import { UpdatePermissonByRoleController } from './controllers/updatePermissionByRole.controller';
import { UpdatePermissionByRoleService } from './services/updatePermissionByRole.service';



const httpController = [
    GetPermissonByRoleController,
    UpdatePermissonByRoleController
]

const Repository = [
    PermissionRepository
]


const Services = [
    GetPermissionByRoleService,
    UpdatePermissionByRoleService,
    JwtService
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
})
export class PermissionModule { }     
