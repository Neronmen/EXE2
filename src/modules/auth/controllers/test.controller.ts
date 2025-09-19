import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dtos/login.dto";
import { JWTGuard } from "../guards/jwt.guard";
import { PermissionGuard } from "../guards/permissions.guard";
import { Permissions } from "../guards/permission.decorator";


@ApiTags(
    `${resourcesV1.TEST.parent}`,
)
@Controller(routesV1.apiversion)
export class TestController {
    constructor(
    ) { }
    @ApiOperation({ summary: resourcesV1.TEST.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, PermissionGuard)
    @Permissions('TEST')
    @Post(routesV1.test.root)
    async test() {
        return "Test"
    }
}