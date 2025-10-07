import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ShopFollowerService } from "../services/followShop.service";

@ApiTags(
    `${resourcesV1.FOLLOW_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class FollowShopController {
    constructor(private readonly shopFollowerService: ShopFollowerService) { }

    @ApiOperation({ summary: resourcesV1.FOLLOW_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Post(routesV1.shop.followShop)
    async followShop(@Param("id") shopID: number, @GetUser() user) {
        return await this.shopFollowerService.followShop(Number(shopID), user.id)
    }
}