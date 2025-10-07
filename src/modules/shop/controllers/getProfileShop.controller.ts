import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetProfileShopService } from "../services/getProfileShop.service";

@ApiTags(
    `${resourcesV1.GET_PROFILE_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class GetProfileShopController {
    constructor(
        private readonly GetProfileShopService: GetProfileShopService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_PROFILE_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2, 3, 4)
    @Get(routesV1.shop.root)
    async getProfileShop(@GetUser() user) {
        return await this.GetProfileShopService.getProfileShop(user)
    }
}