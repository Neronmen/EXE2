import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ShopFollowerService } from "../services/followShop.service";
import { ListShopFollowerService } from "../services/getAllFollowShop.service";

@ApiTags(
    `${resourcesV1.LIST_FOLLOW_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class ListFollowShopController {
    constructor(
        private readonly ListShopFollowerService: ListShopFollowerService
    ) { }
    @ApiOperation({ summary: resourcesV1.LIST_FOLLOW_SHOP.displayName })
    @ApiBearerAuth()
    @Get(routesV1.shop.listFollowShop)
    async listfollowShop(@Param("id") shopID: number) {
        return await this.ListShopFollowerService.getFollowers(Number(shopID))
    }
}       