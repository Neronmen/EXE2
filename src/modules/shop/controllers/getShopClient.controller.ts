import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetProfileShopService } from "../services/getProfileShop.service";
import { GetShopClientService } from "../services/getShopClient.service";
import { OptionalJWTGuard } from "src/modules/auth/guards/optional-jwt.guard";

@ApiTags(
    `${resourcesV1.GET_SHOP_CLIENT.parent}`,
)
@Controller(routesV1.apiversion)
export class GetShopClientController {
    constructor(
        private readonly GetShopClientService: GetShopClientService
    ) { }
    @ApiBearerAuth()
    @ApiOperation({ summary: resourcesV1.GET_SHOP_CLIENT.displayName })
    @UseGuards(OptionalJWTGuard)
    @Get(routesV1.shop.getShopClient)
    async getShopClient(@Param('slug') slug: string, @GetUser() user) {
        return await this.GetShopClientService.getShopBySlug(slug, user)
    }
}