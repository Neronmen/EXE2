import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ShopFollowerService } from "../services/followShop.service";
import { UnFollowerService } from "../services/unfollowShop.service";

@ApiTags(
    `${resourcesV1.UNFOLLOW_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class UnFollowShopController {
    constructor(
        private readonly UnFollowerService: UnFollowerService
    ) { }
    @ApiOperation({ summary: resourcesV1.UNFOLLOW_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Delete(routesV1.shop.followShop)
    async unfollowShop(@Param("id") sellerID: number, @GetUser() user) {
        return await this.UnFollowerService.unfollowShop(Number(sellerID), user.id)
    }
}