import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetPermissionByRoleService } from "../services/getPermissionByRole.service";

@ApiTags(
    `${resourcesV1.GET_PERMISSION_BY_ROLE.parent}`,
)
@Controller(routesV1.apiversion)
export class GetPermissonByRoleController {
    constructor(
        private readonly getPermissionByRoleService: GetPermissionByRoleService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_PERMISSION_BY_ROLE.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Get(routesV1.permission.getPermissonByRole)
    async getPermissionByRole(@Param('roleID') roleID: number) {
        return await this.getPermissionByRoleService.getPermissionByRole(roleID)
    }
}