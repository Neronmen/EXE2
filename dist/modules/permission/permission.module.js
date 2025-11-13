"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const getPermissionByRole_controller_1 = require("./controllers/getPermissionByRole.controller");
const permission_repository_1 = require("./repositories/permission.repository");
const getPermissionByRole_service_1 = require("./services/getPermissionByRole.service");
const updatePermissionByRole_controller_1 = require("./controllers/updatePermissionByRole.controller");
const updatePermissionByRole_service_1 = require("./services/updatePermissionByRole.service");
const httpController = [
    getPermissionByRole_controller_1.GetPermissonByRoleController,
    updatePermissionByRole_controller_1.UpdatePermissonByRoleController
];
const Repository = [
    permission_repository_1.PermissionRepository
];
const Services = [
    getPermissionByRole_service_1.GetPermissionByRoleService,
    updatePermissionByRole_service_1.UpdatePermissionByRoleService,
    jwt_1.JwtService
];
let PermissionModule = class PermissionModule {
};
exports.PermissionModule = PermissionModule;
exports.PermissionModule = PermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository],
    })
], PermissionModule);
//# sourceMappingURL=permission.module.js.map