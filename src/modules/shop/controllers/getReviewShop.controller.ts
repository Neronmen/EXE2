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

@ApiTags(
    `${resourcesV1.GET_REVIEW_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class GetReviewShopController {
    constructor(private readonly shopReviewService: ShopReviewService) { }

    @ApiOperation({ summary: resourcesV1.GET_REVIEW_SHOP.displayName })
    @ApiBearerAuth()
    @Get(routesV1.shop.createReviewShop)
    async getShopReviews(
        @Param("id") sellerID: string,
        @Query("page") page: string,
        @Query("limit") limit: string,
    ) {
        return this.shopReviewService.getShopReviews(+sellerID, {
            page: Number(page) || 1,
            limit: Number(limit) || 10,

        });
    }
}