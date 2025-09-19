import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetPermissionByRoleService } from "../services/getPermissionByRole.service";
import { UpdateRolePermissionsDto } from "../dtos/updateRolePermissions.dto";
import { UpdatePermissionByRoleService } from "../services/updatePermissionByRole.service";

@ApiTags(
    `${resourcesV1.UPDATE_PERMISSION_BY_ROLE.parent}`,
)
@Controller(routesV1.apiversion)
export class UpdatePermissonByRoleController {
    constructor(
        private readonly updatePermissionByRoleService: UpdatePermissionByRoleService
    ) { }
    @ApiOperation({ summary: resourcesV1.UPDATE_PERMISSION_BY_ROLE.displayName })
    @ApiBearerAuth()
    @ApiParam({ name: 'roleID', type: Number, description: 'ID của role' })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1)
    @Put(routesV1.permission.getPermissonByRole)
    async updatePermissionByRole(@Param('roleID') roleID: number,
        @Body() body: UpdateRolePermissionsDto) {
        return await this.updatePermissionByRoleService.updatePermissionByRole(roleID, body)
    }
}