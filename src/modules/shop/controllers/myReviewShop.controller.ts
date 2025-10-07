import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetProfileShopService } from "../services/getProfileShop.service";
import { ShopReviewService } from "../services/getReviewShop.service";
import { MyShopReviewService } from "../services/myReviewShop.service";

@ApiTags(
    `${resourcesV1.MY_REVIEW_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class MyReviewShopController {
    constructor(
        private readonly MyShopReviewService: MyShopReviewService
    ) { }
    @ApiOperation({ summary: resourcesV1.MY_REVIEW_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Get(routesV1.shop.myReviewShop)
    async myReviewShop(
        @Param("id") shopID: string,
        @GetUser() user
    ) {
        return await this.MyShopReviewService.myReview(+shopID, user)
    }
}